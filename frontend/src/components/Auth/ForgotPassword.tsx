// This components functionality is to send email to db to reset user password

// ============================
// ========= MODULES ==========
// ============================

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink } from "react-router-dom";
import { forgotPasswordInputSchema, useForgotPassword } from "@/lib/auth";
import { useNotificationState } from "@/store/UI/NotificationStore";
// ============================
// ======= COMPONENTS =========
// ============================
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "@/components/UI/Copyright/Copyright";

const ForgotPassword = () => {
  // FormData type set to indicate what input this form should hold
  type FormData = z.infer<typeof forgotPasswordInputSchema>;

  const navigate = useNavigate();

  // useForm component methods from react-hook-form package
  const {
    // register on an input field, it tells react-hook-form to track and manage the value of that input.
    // If you are using a resolver like zodResolver with a schema (as in your example), register will
    // ensure that validation rules are applied to the input fields according to the schema.
    register,
    handleSubmit,
    // Current form state to handle different state like errors
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordInputSchema),
    defaultValues: {
      email: "",
    },
  });

  // SEND DATA
  const forgotPasswordMutation = useForgotPassword({
    mutationConfig: {
      onSuccess: (data) => {
        useNotificationState
          .getState()
          .setNotification(`${data.message}`, "success", "outlined");
        navigate("/signin");
      },
      onError: (error) => {
        useNotificationState
          .getState()
          .setNotification(
            `${error}` ||
              "Could not reset password. Try again later or contact support",
            "error",
            "outlined"
          );
        console.log(error);
      },
    },
  });

  const onSubmit = (data: FormData) => {
    forgotPasswordMutation.mutate(data);
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
          Forgot password?
        </Typography>
        <Typography
          component="h4"
          sx={{ padding: "1.5rem 1.5rem 0 1.5rem", textAlign: "center" }}
        >
          An email with instructions to reset the password will be sent to the
          below email address.
        </Typography>

        {/* Form with inputs */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={status === "pending"}
              sx={{ mt: 3, mb: 2 }}
            >
              {forgotPasswordMutation.isPending ? "Submitting..." : "Submit"}
            </Button>

            {/* NAVIGATION LINKS */}
            <Grid container sx={{ gap: "1rem" }}>
              <Grid item container>
                <Link to="/signin" component={RouterLink} variant="body2">
                  Already have account?
                </Link>
              </Grid>
              <Grid item container>
                <Link to="/signup" component={RouterLink} variant="body2">
                  Don't have an account?
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

export default ForgotPassword;
