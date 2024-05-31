import { Input, Modal, Typography } from 'antd';
import useRootStore from '../../hooks/useRootStore';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    password: yup.string().required('If you wanna join the channel, you should enter the password!'),
});

const ModalToPrivateChannel = () => {
    const { visibleStore, usersStore, channelStore } = useRootStore();
    const {
        visible: { newChannelToJoinModal },
        hide,
    } = visibleStore;
    const { tryToJoinThePrivateChannel } = usersStore;
    const { getOneChannelOperation } = channelStore;

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema,
        onSubmit: async values => {
            await tryToJoinThePrivateChannel({
                channelId: getOneChannelOperation.data.id,
                password: values.password,
            })
                .catch(error => {
                    formik.setErrors({ password: 'Something wrong!' });
                })
                .then(response => {
                    if (response) {
                        channelStore.getMyChannels();
                        hideModal();
                        formik.resetForm();
                    }
                });
        },
    });

    const hideModal = () => {
        hide('newChannelToJoinModal');
    };

    const handleCancel = () => {
        hideModal();
    };

    const handleOk = () => {
        formik.handleSubmit();
    };

    const isError = !!formik.errors.password;
    return (
        <Modal
            title="This is a private group, you must enter the group password!"
            open={newChannelToJoinModal}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Input
                placeholder="Enter password"
                size="large"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                style={{
                    ...(isError && {
                        borderColor: 'red',
                    }),
                }}
            />

            {formik.errors.password && <Typography.Text type="danger">{formik.errors.password}</Typography.Text>}
        </Modal>
    );
};

export default observer(ModalToPrivateChannel);
