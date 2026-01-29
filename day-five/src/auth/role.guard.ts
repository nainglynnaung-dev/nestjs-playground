import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./role.enum";
import { Role_keys } from "src/decorator/roles.decorator";

export class RoleGuard implements CanActivate{
    constructor(private reflector:Reflector){

    }
    async canActivate(context: ExecutionContext):Promise<boolean>{
      const requiredRoles=this.reflector.getAllAndOverride<Role[]>(Role_keys,[
        context.getHandler(),
        context.getClass()
      ]);
      if(!requiredRoles){
        return true;
      }
      const request=context.switchToHttp().getRequest();
      const user=request.user;
      return requiredRoles.some(role=>user.roles.includes(role));
    }
}