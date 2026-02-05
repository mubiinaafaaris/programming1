"use client";

import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Checkbox,
  FormGroup,
  Stepper,
  Step,
  StepLabel,
  Alert,
  InputAdornment,
  Avatar,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import {
  Mosque as MosqueIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  CheckCircle,
  MenuBook as BookIcon,
  AccessTime as TimeIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import Image from "next/image";

const steps = ["Personal Information", "Course Selection", "Review & Submit"];

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    guardianName: "",
    guardianPhone: "",

    // Course Selection
    courseType: "",
    studyMode: "online",
    preferredDays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: true,
      sunday: false,
    },
    preferredTime: "morning",
    previousKnowledge: "none",

    // Additional Info
    specialNeeds: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const islamicCourses = [
    { value: "quran_basics", label: "Quran Reading Basics", duration: "3 months" },
    { value: "tajweed", label: "Tajweed Rules", duration: "6 months" },
    { value: "hifz", label: "Quran Memorization (Hifz)", duration: "2-3 years" },
    { value: "islamic_history", label: "Islamic History", duration: "4 months" },
    { value: "fiqh", label: "Basic Fiqh", duration: "5 months" },
    { value: "arabic", label: "Arabic Language", duration: "8 months" },
    { value: "seerah", label: "Seerah of Prophet (PBUH)", duration: "3 months" },
  ];

  const knowledgeLevels = [
    { value: "none", label: "No previous knowledge" },
    { value: "basic", label: "Can read Quran without Tajweed" },
    { value: "intermediate", label: "Know basic Tajweed rules" },
    { value: "advanced", label: "Memorized some Surahs" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleCheckboxChange = (day: string) => {
    setFormData({
      ...formData,
      preferredDays: {
        ...formData.preferredDays,
        [day]: !formData.preferredDays[day as keyof typeof formData.preferredDays],
      },
    });
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
    }

    if (step === 1) {
      if (!formData.courseType) newErrors.courseType = "Please select a course";
    }

    if (step === 2) {
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(2)) {
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setActiveStep(0);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          gender: "",
          address: "",
          guardianName: "",
          guardianPhone: "",
          courseType: "",
          studyMode: "online",
          preferredDays: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: true,
            sunday: false,
          },
          preferredTime: "morning",
          previousKnowledge: "none",
          specialNeeds: "",
          agreeToTerms: false,
        });
      }, 5000);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              <Box sx={{ flex: "1 1 300px" }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Box>
              <Box sx={{ flex: "1 1 300px" }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Box>
            </Box>
            
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              <Box sx={{ flex: "1 1 300px" }}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Box>
              <Box sx={{ flex: "1 1 300px" }}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Box>
            </Box>
            
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              <Box sx={{ flex: "1 1 300px" }}>
                <FormControl fullWidth error={!!errors.gender} required>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={(e) => handleInputChange(e as any)}
                    label="Gender"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                  {errors.gender && (
                    <Typography variant="caption" color="error">
                      {errors.gender}
                    </Typography>
                  )}
                </FormControl>
              </Box>
              <Box sx={{ flex: "1 1 300px" }}>
                <TextField
                  fullWidth
                  label="Guardian Name (if under 18)"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleInputChange}
                />
              </Box>
            </Box>
            
            <Box>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                multiline
                rows={2}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box>
              <FormControl fullWidth error={!!errors.courseType} required>
                <InputLabel>Select Course</InputLabel>
                <Select
                  name="courseType"
                  value={formData.courseType}
                  onChange={(e) => handleInputChange(e as any)}
                  label="Select Course"
                >
                  {islamicCourses.map((course) => (
                    <MenuItem key={course.value} value={course.value}>
                      {course.label} ({course.duration})
                    </MenuItem>
                  ))}
                </Select>
                {errors.courseType && (
                  <Typography variant="caption" color="error">
                    {errors.courseType}
                  </Typography>
                )}
              </FormControl>
            </Box>
            
            <Box>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Quran Knowledge Level</FormLabel>
                <RadioGroup
                  name="previousKnowledge"
                  value={formData.previousKnowledge}
                  onChange={handleInputChange}
                >
                  {knowledgeLevels.map((level) => (
                    <FormControlLabel
                      key={level.value}
                      value={level.value}
                      control={<Radio />}
                      label={level.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>

            <Box>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Study Mode</FormLabel>
                <RadioGroup
                  row
                  name="studyMode"
                  value={formData.studyMode}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="online" control={<Radio />} label="Online" />
                  <FormControlLabel value="in-person" control={<Radio />} label="Face-to-face" />
                  <FormControlLabel value="both" control={<Radio />} label="Both" />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Preferred Days</FormLabel>
                <FormGroup row sx={{ flexWrap: "wrap" }}>
                  {Object.entries(formData.preferredDays).map(([day, checked]) => (
                    <FormControlLabel
                      key={day}
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={() => handleCheckboxChange(day)}
                          name={day}
                        />
                      }
                      label={day.charAt(0).toUpperCase() + day.slice(1)}
                      sx={{ minWidth: "100px" }}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Box>

            <Box>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Preferred Time</FormLabel>
                <RadioGroup
                  row
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  sx={{ flexWrap: "wrap" }}
                >
                  <FormControlLabel value="morning" control={<Radio />} label="Morning (8:00-12:00)" />
                  <FormControlLabel value="afternoon" control={<Radio />} label="Afternoon (1:00-4:00)" />
                  <FormControlLabel value="evening" control={<Radio />} label="Evening (5:00-8:00)" />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        );

      case 2:
        const selectedCourse = islamicCourses.find(c => c.value === formData.courseType);
        
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box>
              <Alert severity="info" sx={{ mb: 2 }}>
                Please review your information before submitting
              </Alert>
            </Box>
            
            <Box>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Personal Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    <Box sx={{ flex: "1 1 300px" }}>
                      <Typography variant="body2" color="textSecondary">Full Name:</Typography>
                      <Typography variant="body1">{formData.fullName}</Typography>
                    </Box>
                    <Box sx={{ flex: "1 1 300px" }}>
                      <Typography variant="body2" color="textSecondary">Email:</Typography>
                      <Typography variant="body1">{formData.email}</Typography>
                    </Box>
                    <Box sx={{ flex: "1 1 300px" }}>
                      <Typography variant="body2" color="textSecondary">Phone:</Typography>
                      <Typography variant="body1">{formData.phone}</Typography>
                    </Box>
                    <Box sx={{ flex: "1 1 300px" }}>
                      <Typography variant="body2" color="textSecondary">Date of Birth:</Typography>
                      <Typography variant="body1">{formData.dateOfBirth}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Box>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Course Selection
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    <Box sx={{ flex: "1 1 300px" }}>
                      <Typography variant="body2" color="textSecondary">Course:</Typography>
                      <Typography variant="body1">{selectedCourse?.label}</Typography>
                    </Box>
                    <Box sx={{ flex: "1 1 300px" }}>
                      <Typography variant="body2" color="textSecondary">Duration:</Typography>
                      <Typography variant="body1">{selectedCourse?.duration}</Typography>
                    </Box>
                    <Box sx={{ flex: "1 1 300px" }}>
                      <Typography variant="body2" color="textSecondary">Study Mode:</Typography>
                      <Typography variant="body1">{formData.studyMode}</Typography>
                    </Box>
                    <Box sx={{ flex: "1 1 300px" }}>
                      <Typography variant="body2" color="textSecondary">Preferred Time:</Typography>
                      <Typography variant="body1">
                        {formData.preferredTime === "morning" ? "Morning" : 
                         formData.preferredTime === "afternoon" ? "Afternoon" : "Evening"}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Special Needs (if any)"
                name="specialNeeds"
                value={formData.specialNeeds}
                onChange={handleInputChange}
                multiline
                rows={2}
                placeholder="If you have any special requirements, please let us know..."
              />
            </Box>

            <Box>
              <FormControl error={!!errors.agreeToTerms} required fullWidth>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        name="agreeToTerms"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I agree to the terms and conditions of the Islamic Studies program.
                        This course focuses on Quran, Hadith, and Islamic Law.
                      </Typography>
                    }
                  />
                </FormGroup>
                {errors.agreeToTerms && (
                  <Typography variant="caption" color="error">
                    {errors.agreeToTerms}
                  </Typography>
                )}
              </FormControl>
            </Box>
          </Box>
        );

      default:
        return "Unknown step";
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
            <CheckCircle sx={{ fontSize: 80, color: "#2E7D32", mb: 2 }} />
            <Typography variant="h4" gutterBottom color="primary">
              Registration Successful!
            </Typography>
            <Typography variant="body1" paragraph>
              Your registration for Islamic Studies has been received. 
              You will receive a confirmation email within 24 hours.
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              For any questions, please call us at {formData.phone}.
            </Typography>
            <Button
              variant="contained"
              onClick={() => setSubmitted(false)}
              sx={{ mt: 2, bgcolor: "#2E7D32", "&:hover": { bgcolor: "#1B5E20" } }}
              size="large"
            >
              Register Another Student
            </Button>
          </Paper>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={4} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={100}
                height={20}
                priority
              />
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  bgcolor: "#2E7D32",
                }}
              >
                <MosqueIcon sx={{ fontSize: 35 }} />
              </Avatar>
            </Box>
            
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                color: "#1B5E20", 
                fontWeight: 700,
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
              }}
            >
              Islamic Studies Registration
            </Typography>
            <Typography variant="h5" gutterBottom color="#2E7D32">
              Learn Quran, Hadith, and Islamic Law
            </Typography>
            <Typography variant="body1" color="textSecondary">
              We offer both online and face-to-face learning options
            </Typography>
          </Box>

          <Box sx={{ mb: 4, p: 2, bgcolor: "#F0F9F0", borderRadius: 2 }}>
            <Typography variant="body2" color="textSecondary" align="center">
              <BookIcon sx={{ fontSize: 16, verticalAlign: "middle", mr: 1, color: "#2E7D32" }} />
              Our courses include: Quran Reading, Tajweed, Islamic History, Fiqh, Arabic Language
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit}>
            {getStepContent(activeStep)}

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                sx={{ color: "#2E7D32", borderColor: "#2E7D32" }}
              >
                Back
              </Button>
              <Box>
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<CheckCircle />}
                    size="large"
                    sx={{ bgcolor: "#2E7D32", "&:hover": { bgcolor: "#1B5E20" } }}
                  >
                    Submit Registration
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ bgcolor: "#2E7D32", "&:hover": { bgcolor: "#1B5E20" } }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </form>

          <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: "divider" }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: "200px" }}>
                <SchoolIcon sx={{ color: "#2E7D32", mr: 1 }} />
                <Typography variant="body2">Qualified Islamic Teachers</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: "200px" }}>
                <TimeIcon sx={{ color: "#2E7D32", mr: 1 }} />
                <Typography variant="body2">Flexible Timings</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: "200px" }}>
                <GroupIcon sx={{ color: "#2E7D32", mr: 1 }} />
                <Typography variant="body2">Small Group Classes</Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}