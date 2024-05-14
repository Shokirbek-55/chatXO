// import React from "react";
import { useTranslation } from 'react-i18next';
// import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';
import TextFieldd from '../../../components/TextField/TextField';
import { Form, Formik } from 'formik';
import Colors from '../../../utils/colors';
// import Regex from "../../../utils/regax";
import Header from '../../../components/Header/Header';
import useRootStore from '../../../hooks/useRootStore';
import { observer } from 'mobx-react-lite';
// import { toJS } from "mobx";
import { EmailIcon, FacebookIcon, GoogleIcon, PasswordIcon, UserIcon } from '../../../assets/icons/icons';
import { ButtonComponent } from '../../../utils/button';
import Text from '../../../components/Text/Text';
import SocialBtn from '../../../utils/socialBtn';
import useVisibility from '../../../hooks/useVisibility';
import { signUpSchema } from './SignUp.schema';

function SignUp() {
    const { register } = useRootStore().authStore;
    const { t } = useTranslation();
    const navigation = useNavigate();
    const loading = useVisibility();
    const passwordVisiblity = useVisibility();
    const passwordConfirmVisiblity = useVisibility();

    return (
        <div className={styles.CreateAnAccount}>
            <Header
                text={`${t('sign_up_header')}`}
                leftIcon="arrowLeft"
                onLeftIconPress={() => navigation('/auth/welcome')}
            />
            <div className={styles.CreateAnAccountBox}>
                <div className={styles.CreateAnAccountContent}>
                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: '',
                            passwordConfirm: '',
                        }}
                        validationSchema={signUpSchema}
                        onSubmit={async value => {
                            loading.show();
                            await register(value, () => {
                                navigation('/auth/otp-verify', {
                                    state: value,
                                });
                            });
                        }}
                    >
                        {() => (
                            <div className={styles.formBox}>
                                <Form>
                                    <TextFieldd
                                        name="username"
                                        type="text"
                                        placeholder="Your username"
                                        icon={<UserIcon />}
                                    />
                                    <TextFieldd
                                        name="email"
                                        type="email"
                                        placeholder="Your email"
                                        icon={<EmailIcon />}
                                    />
                                    <TextFieldd
                                        name="password"
                                        placeholder="Your password"
                                        type={passwordVisiblity.visible ? 'text' : 'password'}
                                        showClick={passwordVisiblity.toggle}
                                        visibility={true}
                                        showPass={passwordVisiblity.visible}
                                        icon={<PasswordIcon />}
                                    />
                                    <TextFieldd
                                        name="passwordConfirm"
                                        placeholder="Password confirm"
                                        type={passwordConfirmVisiblity.visible ? 'text' : 'password'}
                                        showClick={passwordConfirmVisiblity.toggle}
                                        icon={<PasswordIcon />}
                                        visibility={true}
                                        showPass={passwordConfirmVisiblity.visible}
                                    />
                                    <ButtonComponent
                                        type={'submit'}
                                        width="100%"
                                        text="Registration"
                                        height="45px"
                                        loadingType="sprinner"
                                        isLoading={loading.visible}
                                    />
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
                <Text
                    children={t('or sign up with')}
                    color={Colors.Black}
                    fontFamily="Montserrat"
                    fontWeight={400}
                    fontSize="14px"
                    margin="50px 0 50px 0"
                />
                <div className={styles.socialContent}>
                    <SocialBtn
                        icon={<FacebookIcon />}
                        title={`${t('login_fb')}`}
                        // onClick={handleFacebookLogin}
                    />
                    <SocialBtn
                        icon={<GoogleIcon />}
                        title={`${t('login_google')}`}
                        margin="20px 0 0 0"
                        // onClick={handleGoogleSignIn}
                    />
                </div>
            </div>
        </div>
    );
}

export default observer(SignUp);
