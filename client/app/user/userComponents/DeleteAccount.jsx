import useAuthStore from '@/app/store/useAuthStore';
import useUserStore from '@/app/store/useUserStore';
import { Modal } from 'antd';
import React, { useState } from 'react'

const DeleteAccount = ({ deleteModal, setDeleteModal, email }) => {
    const [password, setPassword] = useState('');
    const { deleteAccount, accountDltLoading, logoutProfile } = useAuthStore();
    const { user } = useUserStore();

    const handalCancel = () => {
        setDeleteModal(false);
        setPassword('');
    }

    const confirmDelete = async () => {
        if (user?.authType === 'normal' && password) {
            const res = await deleteAccount(password);
            if (res && res.success) {
                await logoutProfile();
                window.location.replace("/");
                window.location.reload();
            }
        }
        
        if (user?.authType === 'google') {
            const res = await deleteAccount(password);
            if (res && res.success) {
                await logoutProfile();
                window.location.replace("/");
                window.location.reload();
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
                    <div className="flex flex-col">
                        <label className='text-zinc-700 font-semibold text-lg'>Permanently Delete Your Account - </label>
                        <label className='text-zinc-600 text-sm'>Email id : {email}</label>
                    </div>

                    {user?.authType === 'normal' &&
                        <input value={password} autoComplete='off' type='text' name='password' required onChange={(e) => setPassword(e.target.value)} placeholder='Confirm password to delete your account...' className="border border-zinc-400 hover:border-blue-500 transition-all rounded-md w-full p-2.5 text-slate-800" />
                    }
                </div>
            </div>
        </Modal>
    )
}

export default DeleteAccount