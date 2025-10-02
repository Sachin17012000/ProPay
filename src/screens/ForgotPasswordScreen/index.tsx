import { useForm } from "react-hook-form";
import Input from "../../CommonComponent/Input";
import Text from "../../CommonComponent/Text";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "./validation";
import {
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import style from "./style";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { forgotPasswordThunk } from "../../store/features/user/userThunk";
import { clearRetrievedPassword } from "../../store/features/user/userSlice";
import colors from "../../CommonComponent/Theme/Color";
import ProPayLogo from "../../../assets/ProPayLogo.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type ForgotPasswordFormValues = {
  email: string;
};
const ForgotPassword = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.user.loading);
  const retrievedPassword = useAppSelector(
    (state) => state.user.retrievedPassword
  );

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    const resultAction = await dispatch(
      forgotPasswordThunk({ email: data.email })
    );
    if (forgotPasswordThunk.fulfilled.match(resultAction)) {
      Alert.alert(
        "Password Retrieved",
        "Click Show Password to reveal your password."
      );
    } else {
      Alert.alert(
        "Error",
        resultAction.payload || "Failed to retrieve password."
      );
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearRetrievedPassword());
    };
  }, []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={style.scrollViewStyle}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <View style={style.container}>
        <View style={style.imageView}>
          <Image source={ProPayLogo} style={style.imageStyle} />
        </View>
        <Text textType="largeBold" style={style.headingStyle}>
          Forgot Password
        </Text>
        <Input
          placeholder="Enter the registered Email address"
          name="email"
          label="Email"
          control={control}
          error={errors.email?.message as string}
          disabled={retrievedPassword !== null}
        />
        <TouchableOpacity
          disabled={loading || retrievedPassword != null}
          style={[
            style.button,
            loading && { opacity: 0.6 },
            retrievedPassword != null ? style.disableButton : null,
          ]}
          onPress={handleSubmit(onSubmit)}
        >
          {loading ? (
            <ActivityIndicator color={colors.ivory} />
          ) : (
            <Text style={style.buttonText}>Get Password</Text>
          )}
        </TouchableOpacity>
        {retrievedPassword && (
          <View>
            <Text textType="baseRegularBold" style={style.passwordInfoText}>
              Your password has been fetched
            </Text>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text textType="mediumSemiBold" style={style.registerLink}>
                {showPassword ? "Hide Password" : "Show Password"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {retrievedPassword && showPassword && (
          <View style={style.passwordBox}>
            <Text textType="baseRegularBold" style={style.passwordText}>
              Your Password: {retrievedPassword}
            </Text>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};
export default ForgotPassword;
