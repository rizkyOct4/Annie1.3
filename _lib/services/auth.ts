import { prisma } from "@/_lib/db";
import { RandomId } from "@/_util/GenerateData";
import bcrypt from "bcrypt";
import camelcaseKeys from "camelcase-keys";

export const Register = async ({
  firstName,
  lastName,
  email,
  password,
  role,
  fullname,
  picture,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password?: string | undefined;
  role?: string | undefined;
  fullname?: string | undefined;
  picture?: string | undefined;
}) => {
  try {
    const randomId = RandomId();

    const queryCheck = await prisma.$queryRaw<{ email: string }[]>`
      SELECT email from users
      WHERE email = ${email}
      LIMIT 1
    `;
    if (queryCheck.length < 1) {
      // * Credential
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        prisma.$transaction(async (tx) => {
          await tx.$queryRaw`
            INSERT INTO users (iu, first_name, last_name, email, password, role)
            VALUES (${randomId}, ${firstName}, ${lastName}, ${email}, ${passwordHash}, ${role}::user_role)`;
        });
      } else {
        // * OAuth
        prisma.$transaction(async (tx) => {
          await tx.$queryRaw`
            INSERT INTO users (iu, first_name, last_name, email, role) VALUES
            (${randomId}, ${firstName}, ${lastName}, ${email}, 'creator'::user_role)`;
          await tx.$queryRaw`
            INSERT INTO users_description (tar_iu, username, picture) VALUES
            (${randomId}, ${fullname}, ${picture})`;
        });
      }
    }

    const result: any[] = await prisma.$queryRaw`
      SELECT u.public_id, u.role, u.created_at, ud.picture
      FROM users u
      LEFT JOIN users_description ud ON (ud.tar_iu = u.iu)
      WHERE u.email = ${email}`;
    const rawData = {
      id: result[0].public_id,
      role: result[0].role,
      createdAt: result[0].created_at,
      picture: result[0].picture,
    };

    return camelcaseKeys(rawData);
  } catch (err: any) {
    throw new Error(err.message || "Insert failed");
  }
};

export const CredentialsLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const userCheck: any[] =
    await prisma.$queryRaw`SELECT iu, email, password, first_name, last_name, role, public_id, created_at FROM users WHERE email = ${email}`;

  if (userCheck.length === 0) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  const passwordMatch = await bcrypt.compare(password, userCheck[0].password);

  if (!passwordMatch) {
    return {
      success: false,
      message: "Invalid password",
    };
  }

  const rawData = {
    id: userCheck[0].public_id,
    email: userCheck[0].email,
    name: `${userCheck[0].first_name} ${userCheck[0].last_name}`,
    role: userCheck[0].role,
    createdAt: userCheck[0].created_at,
  };

  return {
    success: true,
    user: camelcaseKeys(rawData),
  };
};

// ! AUTH -> untuk mengidentifikasi tiap users !! masih main di login/logout ?!!
// todo BESOK TAMBAH LAGI UNTUK GITHUB
// todo perbaiki route handler kau besok !!
// todo buat credentialProvider !!!
// todo ganti SEMUA AUTH KAU -> AUTH.JS !!!
// todo data profileContext mungkin berubah !!! PERHATIKAN BAIK" !!!
// todo MIDDLEWARE KAU JUGA TERDAMPAK !!!
// todo CALLBACK dari thirdParty !! perhatikan URL nya !!!

// ! https://console.cloud.google.com/auth/clients/297286681262-i7f0u5q8v6umd8lml6ocuf67mhbh9gpu.apps.googleusercontent.com?project=third-serenity-480313-g6&supportedpurview=project

// ? tapaScript by Tapas Adhikary
