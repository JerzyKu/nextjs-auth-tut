import React from "react";
import { CardWrapper } from "./card-wrapper";

type Props = {};

export function LoginForm({}: Props) {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      Login Form! <hr />
      E-Mail <hr />
      Password <hr />
    </CardWrapper>
  );
}
