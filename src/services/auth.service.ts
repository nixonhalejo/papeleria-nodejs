import { UserRepository } from '../repositories/user.repository.js';
import { hashPassword, comparePassword, generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import { AppError } from '../errors/AppError.js';
import { IUser } from '../models/user.model.js';

export class AuthService {
  private userRepo = new UserRepository();

  async register(data: Partial<IUser>) {
    const existingUser = await this.userRepo.findByEmail(data.email!);
    if (existingUser) throw new AppError(409, 'El correo electrónico ya está registrado');

    data.password = await hashPassword(data.password!);
    const newUser = await this.userRepo.create(data);

    return {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  }

  async login(email: string, pass: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new AppError(401, 'Credenciales inválidas');

    const isValidPassword = await comparePassword(pass, user.password);
    if (!isValidPassword) throw new AppError(401, 'Credenciales inválidas');

    const payload = { id: (user._id as string).toString(), role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      accessToken,
      refreshToken,
    };
  }
}