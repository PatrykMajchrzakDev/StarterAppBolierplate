// ========= MODULES ==========
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "react-router-dom";

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

const SignUp = () => {
  // Define types for form data
  type FormData = z.infer<typeof signUpInputSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(signUpInputSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync: registerUser, isLoading } = useRegister();
  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data);
      redirect("/signin");
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
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontSize: "1.7rem", textAlign: "center" }}
        >
          Sign up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
            {apiError && (
              <Typography color="error" gutterBottom>
                {apiError}
              </Typography>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Email"
                  fullWidth
                  margin="normal"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputLabelProps={{ style: { fontSize: "1.7rem" } }}
                  inputProps={{ style: { fontSize: "1.7rem" } }}
                  FormHelperTextProps={{ style: { fontSize: "1.4rem" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Name"
                  fullWidth
                  margin="normal"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  InputLabelProps={{ style: { fontSize: "1.7rem" } }}
                  inputProps={{ style: { fontSize: "1.7rem" } }}
                  FormHelperTextProps={{ style: { fontSize: "1.4rem" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputLabelProps={{ style: { fontSize: "1.7rem" } }}
                  inputProps={{ style: { fontSize: "1.7rem" } }}
                  FormHelperTextProps={{ style: { fontSize: "1.4rem" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputLabelProps={{ style: { fontSize: "1.7rem" } }}
                  inputProps={{ style: { fontSize: "1.7rem" } }}
                  FormHelperTextProps={{ style: { fontSize: "1.4rem" } }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting || isLoading}
              sx={{ mt: 3, mb: 2, fontSize: "1.7rem" }}
            >
              Sign In
            </Button>
          </Box>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" sx={{ fontSize: "1.3rem" }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signin" variant="body2" sx={{ fontSize: "1.3rem" }}>
                {"Already have account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default SignUp;

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
