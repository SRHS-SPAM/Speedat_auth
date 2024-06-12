import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from './const/auth.const';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
    ){}

    /** 
     *  만들려는 기능
     * 1) registerWithEmail
     *      - email, password, name, class, number
     *      - 생성이 완료되면 accessToken과 refreshTokena을 반환한다.
     *      - 회원가입 완료 후 다시 로그인해 주세요 <- 를 방지하기 위해서
     * 
     * 2) loginWithEmail
     *      - email, password을 입력하면 사용자 검증을 진행한다.
     *      - 검증이 완료되면  accessToken과 refreshToken을 반환한다.
     * 3) loginUser
     *      - (1)과 (2)에서 필요한 accessToken과 refreshToken을 반환하는 로직
     * 4) signToken             ✅(6월 12일 오후 8시 50분경)
     *      - (3)에서 필요한 accessToken과 refreshToken을 sign하는 로직
     * 5) authenticatenWithEmailAndPassword
     *      - (2)에서 로그인을 진행할때 필요한 기본적인 검증 진행
     *        1. 사용자가 존재하는지 확인 => email로 확인
     *        2. 비밀번호가 맞는지 확인
     *        3. 모두 통과되면 찾은 사용자 정보 반환
     *        4. loginWithEmail에서 반환된 데이터를 기반으로 토큰 생성
     */

    /**
     * Payload에 들어갈 정보 <= 인증시 필요한 정보
     * 1)email
     * 2)type : 'access' | 'refresh'
     */

    signToken(email: string, isRefreshToken : boolean){
        const payload = {
            email,
            type : isRefreshToken? 'refresh' : 'access',
        };
        return this.jwtService.sign(payload, {
            secret: JWT_SECRET,
            //초 단위로
            expiresIn: isRefreshToken ? 3600 : 300,
        });
    }

    loginUser(user : string){
        return{
            accessToken: this.signToken(user, false),
            refreshToken: this.signToken(user, true),
        }
    }
}
