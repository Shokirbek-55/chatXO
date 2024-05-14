import { useLocation, useNavigate } from 'react-router-dom';
import Colors from '../../../utils/colors';
import styles from '../sign-up/SignUp.module.css';
import { observer } from 'mobx-react-lite';
import Header from '../../../components/Header/Header';
import Text from '../../../components/Text/Text';
import OtpInput from 'react-otp-input';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { OtpVerifyStyles } from './OtpVerify.styles';
import { ButtonComponent } from '../../../utils/button';
import useVisibility from '../../../hooks/useVisibility';
import { RegisterData } from '../../../types/auth';
import useRootStore from '../../../hooks/useRootStore';

function OtpVerify() {
    const navigation = useNavigate();
    const { verify } = useRootStore().authStore;
    const [otp, setOtp] = useState('');
    const loading = useVisibility();
    const location = useLocation();
    const userInfo: RegisterData = location.state;
    const buttonDisabled = !(!!otp && otp.length === 4) || loading.visible;

    const onVerify = useCallback(async () => {
        loading.show();
        await verify({ ...userInfo, code: otp });
    }, [loading, otp, userInfo, verify]);

    useEffect(() => {
        !buttonDisabled && onVerify();
    }, [buttonDisabled, onVerify]);

    return (
        <div className={styles.CreateAnAccount}>
            <Header
                text={`OTP VERIFICATION`}
                leftIcon="arrowLeft"
                onLeftIconPress={() => navigation('/auth/welcome')}
            />
            <div className={styles.CreateAnAccountBox}>
                <div className={styles.CreateAnAccountContent}>
                    <OtpVerifyStyles.FormBox>
                        <Text
                            textAlign={'center'}
                            fontWeight={400}
                            fontFamily="Montserrat"
                            color={Colors.DarkGray}
                            margin="0 0 50px 0"
                            children={
                                <p>
                                    A verification code has been send to
                                    <br />
                                    <b>{userInfo?.email}</b>
                                </p>
                            }
                        />
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            inputStyle={{ width: '50px' }}
                            renderSeparator={<OtpVerifyStyles.Space />}
                            renderInput={props => <OtpVerifyStyles.Input {...props} />}
                        />
                    </OtpVerifyStyles.FormBox>
                </div>

                <div className={styles.socialContent} style={{ paddingTop: '30px' }}>
                    <ButtonComponent
                        type={'submit'}
                        width="100%"
                        text="Confirm"
                        height="45px"
                        loadingType="sprinner"
                        disabled={buttonDisabled}
                        isLoading={loading.visible}
                        clickMe={onVerify}
                    />
                </div>
            </div>
        </div>
    );
}

export default observer(OtpVerify);
