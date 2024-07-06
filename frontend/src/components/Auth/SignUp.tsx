// ========= MODULES ==========
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import { useNotificationState } from "@/store/UI/NotificationStore";
import { signUpInputSchema } from "@/lib/auth";
import { useRegister } from "@/lib/auth";
// ============================
// ======= COMPONENTS =========
// ============================
import {
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Container,
  CssBaseline,
  Avatar,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "@/components/UI/Copyright/Copyright";

const SignUp = () => {
  // FormData type set to indicate what input this form should hold
  type FormData = z.infer<typeof signUpInputSchema>;
  const navigate = useNavigate();
  const {
    // register on an input field, it tells react-hook-form to track and manage the value of that input.
    // If you are using a resolver like zodResolver with a schema (as in your example), register will
    // ensure that validation rules are applied to the input fields according to the schema.
    register,
    handleSubmit,

    // Current form state to handle different state like isLoading
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpInputSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync: registerUser, status } = useRegister();

  const onSubmit = async (data: FormData) => {
    try {
      // If OK then show notification and navigate to /app
      await registerUser(data);

      navigate("/signin");
      useNotificationState
        .getState()
        .setNotification(
          "Registered user. Please check your email to verify your account.",
          "success",
          "outlined"
        );
    } catch (error: any) {
      useNotificationState
        .getState()
        .setNotification(
          `${error.response.data.error}` ||
            "Could not reset password. Try again later or contact support",
          "error",
          "outlined"
        );
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ fontSize: 1.7 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Upper side of form - icon and text */}
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Sign up
        </Typography>
        {/* Form with inputs */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* EMAIL FIELD */}
                <TextField
                  required
                  label="Email"
                  fullWidth
                  margin="normal"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                {/* NAME FIELD */}
                <TextField
                  required
                  label="Name"
                  fullWidth
                  margin="normal"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12}>
                {/* PASSWORD FIELD */}
                <TextField
                  required
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                {/* CONFIRM PASSWORD FIELD */}
                <TextField
                  required
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              </Grid>
            </Grid>
            <Typography sx={{ padding: "2rem 0" }}>
              <span style={{ color: "red" }}>*</span> Upon successful
              registering you must confirm your address email via a message we
              send to your email address.
            </Typography>
            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={status === "pending"}
              sx={{ mt: 3, mb: 2 }}
            >
              {status === "pending" ? "Signing up..." : "Sign up"}
            </Button>
          </Box>
          {/* NAVIGATION LINKS */}
          <Grid container sx={{ gap: "1rem" }}>
            <Grid item container>
              <Link to="/signin" component={RouterLink} variant="body2">
                Already have account?
              </Link>
            </Grid>
            <Grid item container>
              <Link to="/forgotpassword" component={RouterLink} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item container>
              <Link to="/resendemail" variant="body2" component={RouterLink}>
                Resend verification email?
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Copyright alignText="center" sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default SignUp;
