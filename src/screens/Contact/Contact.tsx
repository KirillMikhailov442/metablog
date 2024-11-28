'use client';

import { FC, useState } from 'react';
import styles from './Contact.module.scss';
import Input from '@components/UI/Input/Input';
import Button from '@components/UI/Button/Button';
import { IoPersonCircle } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import Textarea from '@components/UI/Textarea/Textarea';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import * as Yup from 'yup';
import { CircularProgress } from '@mui/material';
import emailjs from '@emailjs/browser';

import success_sending_img from '@assets/success-sending-mail.png';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const ContactScreen: FC = () => {
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const t = useTranslations('contactPage');
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required(t('form.enterName')),
      email: Yup.string()
        .trim()
        .email(t('form.InvalidEmail'))
        .required(t('form.enterEmail')),
      message: Yup.string().trim().required(t('form.writeSomething')),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!loading) {
        setLoading(true);

        emailjs
          .send(
            String(process.env.EMAILJS_SERVICE_ID),
            String(process.env.EMAILJS_TEMPLATE_ID),
            {
              to_name: 'Meta Blog team',
              from_name: values.name,
              from_email: values.email,
              message: values.message,
            },
            process.env.EMAILJS_USER_ID,
          )
          .then(() => setIsSendEmail(true))
          .catch(() => alert('Error'))
          .finally(() => setLoading(false));

        resetForm();
      }
    },
  });
  return (
    <div className={styles.container}>
      {!isSendEmail ? (
        <>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={styles.title}
          >
            {t('title')}
          </motion.h2>
          <motion.h6
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={styles.subtitle}
          >
            {t('subtitle')}
          </motion.h6>
          <motion.form
            initial={{ y: 20, opacity: 0, scale: 0.2 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            onSubmit={formik.handleSubmit}
            className={styles.form}
          >
            <Input
              placeholder={t('form.yourName')}
              var="outline"
              icon={<IoPersonCircle size={22} />}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.errors.name}
              name="name"
            />
            <Input
              placeholder={t('form.yourEmail')}
              var="outline"
              icon={<MdOutlineEmail size={22} />}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.errors.email}
              name="email"
            />
            <Textarea
              className={styles.textarea}
              var="outline"
              placeholder={t('form.enterMessage')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              error={formik.errors.message}
              name="message"
            />
            {!loading && (
              <Button className={styles.button}>{t('form.send')}</Button>
            )}
            {loading && (
              <Button
                className={styles.button}
                onClick={() => {}}
                var="outline"
              >
                <CircularProgress size={20} />
              </Button>
            )}
          </motion.form>
        </>
      ) : (
        <div className={styles.success}>
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {t('form.success')}
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {t('form.read')}
          </motion.p>
          <Image
            src={success_sending_img}
            alt="succes sending mail"
            width={200}
            height={200}
          />
        </div>
      )}
    </div>
  );
};

export default ContactScreen;
