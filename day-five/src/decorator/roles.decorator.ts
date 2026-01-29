import { SetMetadata } from "@nestjs/common"
import { Role } from "src/auth/role.enum"

export const Role_keys="roles"
export const Roles=(role:Role[])=>SetMetadata(Role_keys,role)