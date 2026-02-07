import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../../store/actions/userAction.jsx";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


const onSubmit = async (data) => {
  try {
    await  dispatch(asyncRegisterUser(data));
    reset();
    navigate("/auth/login");
  } catch (err) {
    console.error(
      "Registration error:",
      err.response?.data || err.message
    );
  }
};


  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-muted px-3">
      <Card className="w-full max-w-sm sm:max-w-md shadow-xl rounded-2xl">
        <CardHeader className="text-center space-y-2 px-4 sm:px-6 pt-6 sm:pt-8">
          <CardTitle className="text-xl sm:text-2xl font-semibold">
         Create New Account 
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Sign up to get started
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 sm:px-6 pb-6 sm:pb-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-5"
          >
            
            <div className="space-y-1.5">
              <Label htmlFor="username">Full Name</Label>
              <Input
                id="username"
                placeholder="your full name"
                className="h-11 sm:h-12"
                {...register("username", {
                  required: "Name is required",
                })}
              />
              {errors.username && (
                <p className="text-xs sm:text-sm text-destructive">
                  {errors.username.message}
                </p>
              )}
            </div>

          
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="h-11 sm:h-12"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <p className="text-xs sm:text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

          
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-11 sm:h-12"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-xs sm:text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

           

            <Button
              type="submit"
              className="w-full h-11 sm:h-12 text-sm sm:text-base"
            >
              Register
            </Button>

            {/* Login link */}
            <div className="flex items-center justify-center gap-1 text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
              <span>Already have an account?</span>
              <span
                onClick={() => navigate("/auth/login")}
                className="cursor-pointer font-medium text-red-500 hover:text-red-600 transition-colors"
              >
                Login
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
