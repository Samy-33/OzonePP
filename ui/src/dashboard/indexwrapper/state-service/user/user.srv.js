import { RequestUtils } from "../../utils/request.util";
import { getUserDetailRequest } from "../../../../api/api";
import { USER_DETAIL_FAILED } from "./user.const";


class UserService {
    static getUserDetails (username) {
        let headers = RequestUtils.getJsonHeaderWithAuthToken();

        return getUserDetailRequest(headers, username)
            .catch(err => {
                console.log(err);
                return {
                    status: USER_DETAIL_FAILED,
                    errors: {...err}
                };
            });
    };
};


export default { userService: UserService };