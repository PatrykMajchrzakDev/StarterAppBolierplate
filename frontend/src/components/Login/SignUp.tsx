// ========= MODULES ==========
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUpInputSchema } from "@/lib/auth";
import { useRegister } from "@/lib/auth";
// ============================
// ======= COMPONENTS =========
// ============================
import { Typography, TextField, Button, Grid, Box } from "@mui/material";

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
    console.log(data);
    try {
      await registerUser(data);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Signup
        </Typography>

        {apiError && (
          <Typography color="error" gutterBottom>
            {apiError}
          </Typography>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
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
            <TextField
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSubmitting || isLoading}
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default SignUp;
