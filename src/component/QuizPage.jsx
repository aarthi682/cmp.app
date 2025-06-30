import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CmpService } from "../service/CmpService";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  LinearProgress,
  Divider,
} from "@mui/material";

const userId = localStorage.getItem("userId");

export const QuizPage = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timers, setTimers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [allAnswers, setAllAnswers] = useState([]);

  const { categoryId, createdAt } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadQuiz(categoryId, createdAt);
  }, [categoryId, createdAt]);

  const loadQuiz = async (categoryId, createdAt) => {
    try {
      const response = await CmpService.quizType(categoryId, createdAt);
      const data = response.data;

      if (Array.isArray(data) && data.length > 0) {
        const checkQuiz = {
          contentId: data[0].contentId,
          categoryId: parseInt(categoryId),
          userId: parseInt(userId),
          attemptedDate: new Date().toISOString().split("T")[0],
        };

        const eligibilityRes = await CmpService.quizEntire(checkQuiz);

        if (eligibilityRes.data.Status === "Fail") {
          alert(eligibilityRes.data.Message);
          navigate("/fetchAllContent");
          return;
        }

        setQuizData(data);
        const times = data.map((q) => parseInt(q.content?.duration) || 0);
        setTimers(times);
      } else {
        setQuizData([]);
      }
    } catch (error) {
      console.error("Error loading quiz or checking eligibility:", error);
      alert("Error loading quiz.");
    }
  };

  const saveAnswer = async (answer) => {
    try {
      const res = await CmpService.createQuizAttempt(answer);
      console.log("Saved to backend:", res.data);
    } catch (error) {
      console.error("Error saving answer:", error.response?.data || error.message);
    }
  };

  const handleSubmitQuiz = async () => {
    for (let ans of allAnswers) {
      await saveAnswer(ans);
    }
    alert("Quiz submitted and saved!");
    navigate("/fetchAllContent");
  };

  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (!timers[currentQuestionIndex] || timers[currentQuestionIndex] <= 0) return;

    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated = [...prev];
        updated[currentQuestionIndex] = Math.max(updated[currentQuestionIndex] - 1, 0);

        if (updated[currentQuestionIndex] === 0 && currentQuestionIndex < quizData.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        }

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex, timers]);

  const handleAnswerClick = (option) => {
    if (timers[currentQuestionIndex] > 0 && !showResult) {
      setSelectedAnswer(option);
      setShowResult(true);

      const question = quizData[currentQuestionIndex];
      const correct = question.content.correctOption?.toLowerCase();
      const isCorrect = option === correct;

      const answerData = {
        userId: parseInt(userId),
        contentId: question.contentId,
        responseContent: {
          question: question.content.text,
          userOption: option,
        },
        eachQuestionpoints: isCorrect ? question.points : 0,
        totalScore: isCorrect ? question.points : 0,
      };

      setAllAnswers((prev) => [...prev, answerData]);
    }
  };

  const next = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previous = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const current = quizData[currentQuestionIndex]?.content || {};
  const options = current.options || {};
  const correctOption = current.correctOption?.toLowerCase();

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Card sx={{ p: 4 }}>
        <Typography variant="h4" align="center" fontWeight={700}>
          🎯 Quiz Time
        </Typography>

        {quizData.length > 0 ? (
          <Card sx={{ mt: 3, p: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Q{currentQuestionIndex + 1}: {current.text}
              </Typography>

              <LinearProgress
                variant="determinate"
                value={((timers[currentQuestionIndex] || 0) / (parseInt(current.duration) || 1)) * 100}
                sx={{ height: 10, mb: 2 }}
              />
              <Typography color="secondary">
                ⏳ Time Left: {timers[currentQuestionIndex]} seconds
              </Typography>

              <List>
                {Object.keys(options).map((key) => {
                  const isSelected = selectedAnswer === key;
                  const isCorrect = correctOption === key;

                  let bg = "#fff";
                  if (showResult) {
                    if (isCorrect) bg = "#d4edda";
                    else if (isSelected) bg = "#f8d7da";
                  }

                  return (
                    <ListItem disablePadding key={key}>
                      <ListItemButton
                        disabled={showResult}
                        onClick={() => handleAnswerClick(key)}
                        sx={{ backgroundColor: bg, borderRadius: 2, mb: 1 }}
                      >
                        <ListItemText primary={`${key.toUpperCase()}. ${options[key]}`} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>

              {showResult && (
                <Box mt={2} p={2} sx={{ backgroundColor: "#f0f4f8", borderRadius: 2 }}>
                  {selectedAnswer === correctOption ? (
                    <Typography color="success.main">✅ Correct!</Typography>
                  ) : (
                    <>
                      <Typography color="error.main">❌ Incorrect</Typography>
                      <Typography>
                        <strong>Explanation:</strong> {current.description || "No explanation available."}
                      </Typography>
                    </>
                  )}
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              <Box display="flex" justifyContent="space-between">
                <Button onClick={previous} disabled={currentQuestionIndex === 0}>
                  ⬅️ Previous
                </Button>
                {currentQuestionIndex === quizData.length - 1 ? (
                  <Button variant="contained" color="success" onClick={handleSubmitQuiz}>
                    ✅ Submit
                  </Button>
                ) : (
                  <Button variant="contained" onClick={next}>
                    Next ➡️
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        ) : (
          <Typography align="center" sx={{ mt: 4 }}>
            No quiz found.
          </Typography>
        )}
      </Card>
    </Container>
  );
};
