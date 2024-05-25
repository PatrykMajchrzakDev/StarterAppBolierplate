// ========= MODULES ==========
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signInInputSchema } from "@/lib/auth";
import { useLogin } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
  type FormData = z.infer<typeof signInInputSchema>;
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(signInInputSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: loginUser, isLoading } = useLogin();
  // SEND DATA
  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      await loginUser(data);
      navigate("/");
      // TBD Handle successful registration (e.g., redirect, display success message)
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("An unknown error occurred.");
      }
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ fontSize: "1.7rem" }}>
          Sign in
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
            {apiError && (
              <Typography color="error" gutterBottom>
                {apiError}
              </Typography>
            )}
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
              InputLabelProps={{ style: { fontSize: "1.7rem" } }}
              inputProps={{ style: { fontSize: "1.7rem" } }}
            />
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
              InputLabelProps={{ style: { fontSize: "1.7rem" } }}
              inputProps={{ style: { fontSize: "1.7rem" } }}
            />
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
                "& .MuiFormControlLabel-label": {
                  fontSize: "1.7rem",
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting || isLoading}
              sx={{ mt: 3, mb: 2, fontSize: "1.7rem" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" sx={{ fontSize: "1.3rem" }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="/signup"
                  variant="body2"
                  sx={{ fontSize: "1.3rem" }}
                >
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
      sx={{ fontSize: "1.4rem", mt: 2 }}
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
