import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { passowrdBcrypt } from '../common/bcrypt';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async save(user: any): Promise<User> {
    return new Promise((resolve, reject) => {
      const p = user;
      
      this.beforeCreate(p)
        .then(async res => {
          p.password = await passowrdBcrypt(p.password);
          const createdUser = new this.userModel(p);
          resolve(await createdUser.save());
        })
        .catch(error => {
          resolve(error);
        });
    });
  }

  async findAll(id?: any): Promise<any[]> {
    return await this.userModel.find();
  }
  async findOne(id: any): Promise<any> {
    return await this.userModel.findOne({ _id: id });
  }
  async findByCriteria(criteria: {}): Promise<any> {
    const user = await this.userModel.findOne(criteria);
    console.log("LLLLLLLLL",user);
    
    return user;
  }

  async updateAccessToken(user) {
    const updateAccessToken = await this.userModel.updateOne(
      { _id: user.id },
      { access_token: user.access_token },
    );
  }
  async update(user: any): Promise<{ message: string }> {
    return new Promise(async (resolve, rejects) => {
      if (user.password) {
        user.password = await passowrdBcrypt(user.password);
      }
      this.userModel.updateOne({ _id: user.id }, user, (err, result) => {
        if (err) {
          rejects(err);
        }
        if (result) {
          if (result.nModified === 0) {
            resolve({ message: 'User not updated!' });
          } else {
            resolve({ message: 'User  updated!' });
          }
        }
      });
    });
  }

  async beforeCreate(userData: any) {
    return new Promise(async (resolve, reject) => {
      if (userData.email) {
        const existingUser = await this.userModel.findOne({
          email: userData.email,
        });
        if (existingUser) {
          reject({ errorMessage: 'Email already exists!' });
        } else {
          resolve(true);
        }
      }
    });
  }
}
