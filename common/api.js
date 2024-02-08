import { httpRequest, httpTokenRequest} from "./request.js";

export default {
	// 獲取option list
	getOptionList:params => httpRequest({url:'/sajax/question/get_question/',method:'GET'}, params),
	// 提交表單
	setVisitLog:params => httpRequest({url:'/sajax/visit_log/set_visit_log',method:'POST'}, params),
	//檢查訪客QRCODE
	searchCode:params => httpRequest({url:'/sajax/visit_log/search/',method:'POST'}, params)
}