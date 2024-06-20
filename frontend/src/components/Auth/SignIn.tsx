// ========= MODULES ==========
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink } from "react-router-dom";

import { signInInputSchema } from "@/lib/auth";
import { useLogin } from "@/lib/auth";
import { useNotificationState } from "@/store/UI/NotificationStore";

// ============================
// ======= COMPONENTS =========
// ============================
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "@/components/UI/Copyright/Copyright";

const SignIn = () => {
  // FormData type set to indicate what input this form should hold
  type FormData = z.infer<typeof signInInputSchema>;

  const navigate = useNavigate();

  // useForm component methods from react-hook-form package
  const {
    // register on an input field, it tells react-hook-form to track and manage the value of that input.
    // If you are using a resolver like zodResolver with a schema (as in your example), register will
    // ensure that validation rules are applied to the input fields according to the schema.
    register,
    handleSubmit,
    // Current form state to handle different state like isLoading
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signInInputSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { mutateAsync: loginUser, status } = useLogin();
  // SEND DATA
  const onSubmit = async (data: FormData) => {
    try {
      // If OK then show notification and navigate to /app
      await loginUser(data);
      navigate("/app");
      useNotificationState
        .getState()
        .setNotification("Sign in successfull", "success", "outlined");
    } catch (error) {
      useNotificationState
        .getState()
        .setNotification(
          `${error}` ||
            "Could not reset password. Try again later or contact support",
          "error",
          "outlined"
        );
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
        <Typography component="h1" variant="h5">
          Sign in Qweasdzxc123!
        </Typography>

        {/* Form with inputs */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
            {/* EMAIL FIELD */}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              autoComplete="email"
              autoFocus
            />
            {/* PASSWORD FIELD*/}
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              label="Password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              autoComplete="current-password"
            />
            {/* REMEMBER ME FIELD */}
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  {...register("rememberMe")}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                    },
                  }}
                />
              }
              label="Remember me"
            />
            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={status === "pending"}
              sx={{ mt: 3, mb: 2 }}
            >
              {status === "pending" ? "Signing in..." : "Sign in"}
            </Button>

            {/* NAVIGATION LINKS */}
            <Grid container sx={{ gap: "1rem" }}>
              <Grid item container>
                <Link to="/signup" component={RouterLink} variant="body2">
                  Don't have an account?
                </Link>
              </Grid>
              <Grid item container>
                <Link
                  to="/forgotpassword"
                  variant="body2"
                  component={RouterLink}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item container>
                <Link to="/resendemail" variant="body2" component={RouterLink}>
                  Resend verification email?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
      <Copyright alignText="center" sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default SignIn;
