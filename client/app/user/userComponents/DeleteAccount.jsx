import useUserStore from '@/app/store/useUserStore';
import { Modal } from 'antd';
import React, { useState } from 'react'

const DeleteAccount = ({ deleteModal, setDeleteModal, userId }) => {
    const [password, setPassword] = useState('');
    const { deleteAccount, accountDltLoading, logoutUser } = useUserStore();

    const handalCancel = () => {
        setDeleteModal(false);
    }

    const confirmDelete = async () => {
        if (password) {
            const res = await deleteAccount(password);
            if (res && res.success) {
                await logoutUser();
                window.location.replace("/");
            }
        }
    }

    return (
        <Modal
            open={deleteModal}
            okText={
                accountDltLoading ?
                    'Account deleting...'
                    :
                    'Permanent Delete'
            }
            onCancel={handalCancel}
            onOk={confirmDelete}
            centered
            confirmLoading={accountDltLoading}
            okButtonProps={{
                size: "large",
                disabled: accountDltLoading,
            }}
            cancelButtonProps={{
                size: "large",
                disabled: accountDltLoading,
            }}
        >
            <div className="flex flex-col mb-5">
                <div className="flex flex-col gap-5">
                    <label className='text-zinc-700 font-bold text-lg mb-2'>Permanently Delete Your Account - {userId}</label>
                    <input value={password} autoComplete='off' type='text' name='password' required onChange={(e) => setPassword(e.target.value)} placeholder='Confirm password to delete your account...' className="border border-zinc-400 hover:border-blue-500 transition-all rounded-md w-full p-2.5 text-slate-800" />
                </div>
            </div>
        </Modal>
    )
}

export default DeleteAccount