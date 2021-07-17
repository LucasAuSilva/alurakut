import { Form } from '@unform/web';
import React, { useRef } from 'react';
import Input from '../src/components/Input';
import { useRouter } from 'next/router';
import { FormHandles } from '@unform/core';
import { postAlurakut } from '../src/service/apiAlurakut';
import nookies from 'nookies';

interface IFormLoginData {
  user: string;
}

const Login = () => {
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);

  function handleSubmit(data: IFormLoginData) {

    formRef.current?.setErrors({})

    if (data.user.length <= 0) {

      formRef.current?.setErrors({
        ...formRef.current.getErrors,
        user: 'O usuário deve ser preenchido'
      });
      return
    }

    postAlurakut('/login', data.user).then((values) => {
      nookies.set(null, 'USER_TOKEN', values.token, {
        path: '/',
        maxAge: 86400 * 7
      });
    });

    router.push('/');
  }

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" alt="Logo do alurakut" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <Form ref={formRef} onSubmit={handleSubmit} className="box">
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <Input
              type="text"
              name="user"
              label="Usuário"
              placeholder="Usuário"
            />
            <button type="submit">
              Login
            </button>
          </Form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>
                  ENTRAR JÁ
                </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
}

export default Login;
