import Ajv from 'ajv';
import AuthSchema from '$lib/server/schemas/auth-schema';
import responseJson from '$src/lib/server/utils/reponse';
import bcrypt from 'bcrypt';

export async function POST({ request }) {
  const validate = new Ajv().compile(request.body); // type of validate extends `(data: any) => data is Foo`
  const { user_id, password } = request.body;
  if (!validate) {
    return responseJson({
      message: 'Invalid Form Data.',
      status: 400,
    });
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  console.log(salt);
}
