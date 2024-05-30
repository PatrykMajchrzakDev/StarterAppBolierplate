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
      console.error(error);
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
          Sign in
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
                  value="remember"
                  color="primary"
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                    },
                  }}
                />
              }
              label="Remember me"
              sx={{
                "& .MuiFormControlLabel-label": {},
              }}
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
            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2" component={RouterLink}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" component={RouterLink} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default SignIn;

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
      sx={{ mt: 2 }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
