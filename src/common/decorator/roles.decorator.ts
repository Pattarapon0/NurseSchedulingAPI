
import { Reflector } from '@nestjs/core';
import { role } from '@prisma/client';

export const Roles = Reflector.createDecorator<role[]>();
