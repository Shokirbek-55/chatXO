import { Form, Input, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import useRootStore from '../../../hooks/useRootStore';
import { ButtonComponent } from '../../../utils/button';
import styles from './ForgotPassword.module.css';

const ForgotPasswordView = () => {
    const navigation = useNavigate();
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const { resetPass } = useRootStore().authStore;

    const handleChange = (text: string) => {
        setEmail(text.toLowerCase());
    };
    const handlePress = async () => {
        if (email) {
            resetPass(email, () => navigation('/auth/login'));
            setEmail('');
        } else {
            message.warning('Please enter your email');
        }
    };

    return (
        <div className={styles.container}>
            <Header leftIcon="arrowLeft" onLeftIconPress={() => navigation('/auth/login')} text={t('forgot_pass')} />
            <div className={styles.formBox}>
                <Form
                    className={styles.formItemBox}
                    name="basic"
                    layout="vertical"
                    initialValues={{
                        remember: true,
                        email: email,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        className={styles.formItem}
                        label={t('your_email')}
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input style={{ width: 240 }} onChange={e => handleChange(e.target.value)} name="email" />
                    </Form.Item>
                    <Form.Item>
                        <ButtonComponent clickMe={() => handlePress()} text={`${t('reset_btn')}`} width="220px" />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default observer(ForgotPasswordView);
