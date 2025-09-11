
import { Reflector } from '@nestjs/core';
import { role } from 'generated/prisma';

export const Roles = Reflector.createDecorator<role[]>();
