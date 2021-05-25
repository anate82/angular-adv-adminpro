export interface RegisterForm{
    nombre: string;
    email: string;
    password: string;
    password2: string;
    terminos: boolean;
};

export interface LoginForm{
    email: string;
    password: string;
    remember: boolean;
};
