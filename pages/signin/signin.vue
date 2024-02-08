<template>
	<view class="content">
		<view class="content-header">
			<view class="header-logo" @click="goHomePage"></view>
			<view class="steps-box" :class="stepsClass[stepsStatus]">

			</view>
		</view>
		<view class="content-body">
			<view class="information-form" v-show="stepsStatus == 1">
				<scroll-view :scroll-top="0" scroll-y="true" class="scroll-Y" style="height: calc(100vh - 502px);">
					<view class="information-title">
						<strong style="margin-right: 10px;">VISITOR </strong> <span>INFORMATION</span>
					</view>

					<uni-forms :modelValue="formData">
						<uni-forms-item >
							<input type="text" v-model="formData.first_name" placeholder="First Name" />
						</uni-forms-item>
						<uni-forms-item >
							<input type="text" v-model="formData.name" placeholder="Surname" />
						</uni-forms-item>
						<uni-forms-item>
							<picker mode="selector" @change="bindPickerChange" :value="regionIndex" :range="regionData" range-key="name">
								<view class="picker">
									{{regionData[regionIndex].name}}
								</view>
							</picker>
						</uni-forms-item>
						<uni-forms-item >
							<input type="number" v-model="formData.mobile" placeholder="Your Mobile" />
						</uni-forms-item>
						<uni-forms-item >
							<input type="text" v-model="formData.company_name" placeholder="Your Company Name(if any)" />
						</uni-forms-item>
					</uni-forms>
				</scroll-view>
			</view>
			<view class="information-form" v-show="stepsStatus == 2">
				<view class="information-title">
					<strong style="margin-right: 10px;">VISITOR </strong> <span>Purpose</span>
				</view>
				<scroll-view :scroll-top="0" scroll-y="true" class="scroll-Y" style="height: calc(100vh - 502px);">
					<view class="purpose-box">
						<view class="purpose-item">
							<view class="purpose-question-box">
								<view class="purpose-index">1</view>
								<view class="purpose-question">{{questionTitle}}</view>
								<view class="purpose-answer">
									<radio-group name="question">
										<label @click="changeQuestionSelected(1)">
											<radio value="1"  :checked="questionSeleted == 1 ? true : false"/><text>Yes</text>
										</label>
										<label @click="changeQuestionSelected(2)">
											<radio value="2"  :checked="questionSeleted == 2 ? true : false"/><text>No</text>
										</label>
									</radio-group>
								</view>
							</view>
							<view class="purpose-answer-box" v-if="questionSeleted == 1">
								<view class="purpose-question-info">
									<view class="purpose-question-info-title">Declaration - No criminal convictions</view>
									<view class="purpose-question-info-content">
										<view> I declare that I have not been convicted of a criminal offence (including but not limited to any sexual offence).This declaration excludes any road traffic offences. </view>
										<br>
										<view>
											 I declare that there is no reason why I should not be working with children.
										</view>
										<br>
										<view>
											 I declare that the information provided on this form is true to the best of my knowledge and belie
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="information-form" v-show="stepsStatus == 3" @click="openCamera">
				<view class="information-title">
					<strong style="margin-right: 10px;">VISITOR </strong> <span>TAKE PHOTO</span>
				</view>
				<view class="information-photo">
					<view class="photo-bg" v-if="!photoUrl"></view>
					<view class="photo-box" v-else>
						<img :src="photoUrl" alt="">
					</view>
				</view>
			</view>
			<view class="information-form" v-show="stepsStatus == 4" @click="openPopupToggle">
				<view class="information-title">
					<strong style="margin-right: 10px;">VISITOR </strong> <span>SIGNATURE</span>
				</view>
				<view class="information-signature">
					<view class="photo-bg" v-if="!signatureUrl"></view>
					<view class="photo-box" v-else>
						<img :src="signatureUrl" alt="">
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="paymentPopup" @change="changeSignaturePopup">
			<view class="popup-content">
				<view class="confirm-signature-header">Customer Signature</view>
				<view class="signature-close-btn" @click="closeSignaturePopup"></view>

				<view class="confirm-signature-body">
					<scroll-view :scroll-top="0" scroll-y="true" class="scroll-Y">
						<p> The guidelines overleaf are intended to safeguard all members of our community. Please take some time to read these before your visit commences. Should you have any questions or concerns, please talk to the staff member hosting your visit. </p>
						<br>
						<p> Please Do:</p>
						<p> - Be mindful that certain types of verbal interaction with students may be interpreted by them as being inappropriate.</p>
						<p> - Report any unacceptable behaviour from a student to your host staff member</p>
						<p> - Treat with respect all of our community (as we will you) and observe our protocols and rules including accessing designated facilities (such as washrooms) and permitted general areas only.</p>
						<p> - In event of an evacuation, leave the building calmly and quietly by the nearest staircase and assemble at the designed Assembly point (members of staff will assist you if necessary). </p>
						<br>
						<p> Please Do Not:</p>
						<p> - Take Photo or film students unless you have the school's permission to do so </p>
						<p> - Instigate physical contact with or respond to physical contact from students - if this occurs, then please report it immediately to your host staff member</p>
						<p> - Give any of your personal information to any student or accept personal information from students </p>
					</scroll-view>
				</view>
				<view class="confirm-signature-box">
					<view style="width: 100% ;height: 100%;">
					    <l-signature disableScroll  ref="signatureRef" :penColor="penColor" :penSize="penSize" :openSmooth="openSmooth" ></l-signature>
					</view>
				</view>
				<view class="privacy-clause-box">
					<label @click="changeTermsSelected">
						<checkbox value="1"  :checked="termsSeleted == 1 ? true : false"/><text>I have read and agree to the Terms and Conditions</text>
					</label>
					<label @click="changeDeclarationSelected" v-if="questionSeleted === 1">
						<checkbox value="1"  :checked="declarationSeleted == 1 ? true : false"/><text>I have read and agree to the Declaration – No criminal convictions</text>
					</label>
				</view>
				<view class="confirm-signature-footer">
					<button type="button" class="clean-signature-btn " @tap="Signature('clear')">CLEAR</button>
					<button type="button" class="confirm-signature-btn" @tap="Signature('save')">DONE</button>
				</view>

			</view>
		</uni-popup>
		<view class="content-footer">
			<view class="btn-group">
				<button type="button" class="btn" @click="backPrePage">BACK</button>
				<button type="button" class="btn" @click="cleanAll">CLEAR</button>

				<button type="button" class="btn" @click="submitForm" v-if="stepsStatus == 4">SUBMIT</button>
				<button type="button" class="btn" :disabled="!isCanNext" @click="goOptionPage" v-else>NEXT</button>
			</view>
		</view>
	</view>
</template>

<script>
	import httpApi from '@/common/api.js';
	import {pathToBase64} from '../../js_sdk/mmmm-image-tools/index.js'
	export default {
		data() {
			return {
				formData:{
					first_name : '',
					name : '',
					countryCode: '',
					mobile: '',
					company_name : '',
					camera:{},
					question:[],
					registration_code:"",
					signature:{}
				},
				questionTitle:"What is the purpose of your visit today? Will you be working with Kellett students in any capacity? (E.g. reading group, presentation, guest lesson)",
				question:1,
				questionSeleted:0,
				stepsStatus:1,
				photoUrl:"",
				signatureUrl:'',
				termsSeleted:0,
				declarationSeleted:0,
				stepsClass:{
					1:"steps-1",
					2:"steps-2",
					3:"steps-3",
					4:"steps-4",
				},
				isCanNext:false,
				optionData:[],
				regionIndex: 0,
				regionData: [
					{
						countryCode:'852',
						name:'Hong Kong(+852)',
					},
					{
						countryCode:'44',
						name:'UK (+44)',
					},
					{
						countryCode:'1',
						name:'USA (+1)',
					},
					{
						countryCode:'213',
						name:'Algeria (+213)',
					},
					{
						countryCode:'376',
						name:'Andorra (+376)',
					},
					{
						countryCode:'244',
						name:'Angola (+244)',
					},
					{
						countryCode:'1',
						name:'USA (+1)',
					},
					{
						countryCode:'374',
						name:'Armenia (+374)',
					},
					{
						countryCode:'1264',
						name:'Anguilla (+1264) ',
					},
					{
						countryCode:'1268',
						name:'Antigua & Barbuda (+1268) ',
					},
					{
						countryCode:'54',
						name:'Argentina (+54)',
					},
					{
						countryCode:'297',
						name:'Aruba (+297)',
					},
					{
						countryCode:'43',
						name:'Austria (+43)',
					},
					{
						countryCode:'994',
						name:'Azerbaijan (+994) ',
					},
					{
						countryCode:'1242',
						name:'Bahamas (+1242) ',
					},
					{
						countryCode:'973',
						name:'Bahrain (+973)',
					},
					{
						countryCode:'880',
						name:'Bangladesh (+880) ',
					},
					{
						countryCode:'1246',
						name:'Barbados (+1246) ',
					},
					{
						countryCode:'375',
						name:'Belarus (+375)',
					},
					{
						countryCode:'32',
						name:'Belgium (+32)',
					},
					{
						countryCode:'501',
						name:'Belize (+501)',
					},
					{
						countryCode:'229',
						name:'Benin (+229)',
					},
					{
						countryCode:'1441',
						name:'Bermuda (+1441) ',
					},
					{
						countryCode:'975',
						name:'Bhutan (+975)',
					},
					{
						countryCode:'591',
						name:'Bolivia (+591)',
					},
					{
						countryCode:'387',
						name:'Bosnia Herzegovina (+387) ',
					},
					{
						countryCode:'267',
						name:'Botswana (+267)',
					},
					{
						countryCode:'55',
						name:'Brazil (+55)',
					},
					{
						countryCode:'673',
						name:'Brunei (+673)',
					},
					{
						countryCode:'359',
						name:'Bulgaria (+359)',
					},
					{
						countryCode:'226',
						name:'Burkina Faso (+226) ',
					},
					{
						countryCode:'257',
						name:'Burundi (+257)',
					},
					{
						countryCode:'855',
						name:'Cambodia (+855)',
					},
					{
						countryCode:'237',
						name:'Cameroon (+237)',
					},
					{
						countryCode:'1',
						name:'Canada (+1)',
					},
					{
						countryCode:'238',
						name:'Cape Verde Islands (+238)',
					},
					{
						countryCode:'1345',
						name:'Cayman Islands (+1345) ',
					},
					{
						countryCode:'236',
						name:'Central African Republic (+236) ',
					},
					{
						countryCode:'56',
						name:'Chile (+56)',
					},
					{
						countryCode:'86',
						name:'China (+86)',
					},
					{
						countryCode:'57',
						name:'Colombia (+57)',
					},
					{
						countryCode:'269',
						name:'Comoros (+269)',
					},
					{
						countryCode:'242',
						name:'Congo (+242)',
					},
					{
						countryCode:'682',
						name:'Cook Islands (+682) ',
					},
					{
						countryCode:'506',
						name:'Costa Rica (+506) ',
					},
					{
						countryCode:'385',
						name:'Croatia (+385)',
					},
					{
						countryCode:'53',
						name:'Cuba (+53)',
					},
					{
						countryCode:'90392',
						name:'Cyprus North (+90392) ',
					},
					{
						countryCode:'357',
						name:'Cyprus South (+357) ',
					},
					{
						countryCode:'42',
						name:'Czech Republic (+42) ',
					},
					{
						countryCode:'45',
						name:'Denmark (+45)',
					},
					{
						countryCode:'253',
						name:'Djibouti (+253)',
					},
					{
						countryCode:'1809',
						name:'Dominica (+1809) ',
					},
					{
						countryCode:'1809',
						name:'Dominican Republic (+1809) ',
					},
					{
						countryCode:'593',
						name:'Ecuador (+593)',
					},
					{
						countryCode:'20',
						name:'Egypt (+20)',
					},
					{
						countryCode:'503',
						name:'El Salvador (+503) ',
					},
					{
						countryCode:'240',
						name:'Equatorial Guinea (+240) ',
					},
					{
						countryCode:'291',
						name:'Eritrea (+291)',
					},
					{
						countryCode:'372',
						name:'Estonia (+372)',
					},
					{
						countryCode:'251',
						name:'Ethiopia (+251)',
					},
					{
						countryCode:'500',
						name:'Falkland Islands (+500) ',
					},
					{
						countryCode:'298',
						name:'Faroe Islands (+298) ',
					},
					{
						countryCode:'679',
						name:'Fiji (+679)',
					},
					{
						countryCode:'358',
						name:'Finland (+358)',
					},
					{
						countryCode:'33',
						name:'France (+33)',
					},
					{
						countryCode:'594',
						name:'French Guiana (+594) ',
					},
					{
						countryCode:'689',
						name:'French Polynesia (+689) ',
					},
					{
						countryCode:'241',
						name:'Gabon (+241)',
					},
					{
						countryCode:'220',
						name:'Gambia (+220)',
					},
					{
						countryCode:'7880',
						name:'Georgia (+7880) ',
					},
					{
						countryCode:'49',
						name:'Germany (+49)',
					},
					{
						countryCode:'233',
						name:'Ghana (+233)',
					},
					{
						countryCode:'350',
						name:'Gibraltar (+350) ',
					},
					{
						countryCode:'30',
						name:'Greece (+30)',
					},
					{
						countryCode:'299',
						name:'Greenland (+299) ',
					},
					{
						countryCode:'1473',
						name:'Grenada (+1473) ',
					},
					{
						countryCode:'590',
						name:'Guadeloupe (+590) ',
					},
					{
						countryCode:'671',
						name:'Guam (+671)',
					},
					{
						countryCode:'502',
						name:'Guatemala (+502) ',
					},
					{
						countryCode:'224',
						name:'Guinea (+224)',
					},
					{
						countryCode:'245',
						name:'Guinea - Bissau (+245) ',
					},
					{
						countryCode:'592',
						name:'Guyana (+592)',
					},
					{
						countryCode:'509',
						name:'Haiti (+509)',
					},
					{
						countryCode:'504',
						name:'Honduras (+504)',
					},
					{
						countryCode:'36',
						name:'Hungary (+36)',
					},
					{
						countryCode:'354',
						name:'Iceland (+354)',
					},
					{
						countryCode:'91',
						name:'India (+91)',
					},
					{
						countryCode:'62',
						name:'Indonesia (+62)',
					},
					{
						countryCode:'98',
						name:'Iran (+98)',
					},
					{
						countryCode:'964',
						name:'Iraq (+964)',
					},
					{
						countryCode:'353',
						name:'Ireland (+353)',
					},
					{
						countryCode:'972',
						name:'Israel (+972)',
					},
					{
						countryCode:'39',
						name:'Italy (+39)',
					},
					{
						countryCode:'1876',
						name:'Jamaica (+1876) ',
					},
					{
						countryCode:'81',
						name:'Japan (+81)',
					},
					{
						countryCode:'962',
						name:'Jordan (+962)',
					},
					{
						countryCode:'7',
						name:'Kazakhstan (+7)',
					},
					{
						countryCode:'254',
						name:'Kenya (+254)',
					},
					{
						countryCode:'686',
						name:'Kiribati (+686)',
					},
					{
						countryCode:'850',
						name:'Korea North (+850) ',
					},
					{
						countryCode:'82',
						name:'Korea South (+82) ',
					},
					{
						countryCode:'965',
						name:'Kuwait (+965)',
					},
					{
						countryCode:'996',
						name:'Kyrgyzstan (+996) ',
					},
					{
						countryCode:'856',
						name:'Laos (+856)',
					},
					{
						countryCode:'371',
						name:'Latvia (+371)',
					},
					{
						countryCode:'961',
						name:'Lebanon (+961)',
					},
					{
						countryCode:'266',
						name:'Lesotho (+266)',
					},
					{
						countryCode:'231',
						name:'Liberia (+231)',
					},
					{
						countryCode:'218',
						name:'Libya (+218)',
					},
					{
						countryCode:'417',
						name:'Liechtenstein (+417) ',
					},
					{
						countryCode:'370',
						name:'Lithuania (+370) ',
					},
					{
						countryCode:'352',
						name:'Luxembourg (+352) ',
					},
					{
						countryCode:'853',
						name:'Macao (+853)',
					},
					{
						countryCode:'389',
						name:'Macedonia (+389) ',
					},
					{
						countryCode:'261',
						name:'Madagascar (+261) ',
					},
					{
						countryCode:'265',
						name:'Malawi (+265)',
					},
					{
						countryCode:'60',
						name:'Malaysia (+60)',
					},
					{
						countryCode:'960',
						name:'Maldives (+960)',
					},
					{
						countryCode:'223',
						name:'Mali (+223)',
					},
					{
						countryCode:'356',
						name:'Malta (+356)',
					},
					{
						countryCode:'692',
						name:'Marshall Islands (+692) ',
					},
					{
						countryCode:'596',
						name:'Martinique (+596) ',
					},
					{
						countryCode:'222',
						name:'Mauritania (+222) ',
					},
					{
						countryCode:'269',
						name:'Mayotte (+269)',
					},
					{
						countryCode:'52',
						name:'Mexico (+52)',
					},
					{
						countryCode:'691',
						name:'Micronesia (+691) ',
					},
					{
						countryCode:'373',
						name:'Moldova (+373)',
					},
					{
						countryCode:'377',
						name:'Monaco (+377)',
					},
					{
						countryCode:'976',
						name:'Mongolia (+976)',
					},
					{
						countryCode:'1664',
						name:'Montserrat (+1664) ',
					},
					{
						countryCode:'212',
						name:'Morocco (+212)',
					},
					{
						countryCode:'258',
						name:'Mozambique (+258) ',
					},
					{
						countryCode:'95',
						name:'Myanmar (+95)',
					},
					{
						countryCode:'264',
						name:'Namibia (+264)',
					},
					{
						countryCode:'674',
						name:'Nauru (+674)',
					},
					{
						countryCode:'977',
						name:'Nepal (+977)',
					},
					{
						countryCode:'31',
						name:'Netherlands (+31) ',
					},
					{
						countryCode:'687',
						name:'New Caledonia (+687) ',
					},
					{
						countryCode:'64',
						name:'New Zealand (+64) ',
					},
					{
						countryCode:'505',
						name:'Nicaragua (+505) ',
					},
					{
						countryCode:'227',
						name:'Niger (+227)',
					},
					{
						countryCode:'234',
						name:'Nigeria (+234)',
					},
					{
						countryCode:'683',
						name:'Niue (+683)',
					},
					{
						countryCode:'672',
						name:'Norfolk Islands (+672) ',
					},
					{
						countryCode:'670',
						name:'Northern Marianas (+670) ',
					},
					{
						countryCode:'47',
						name:'Norway (+47)',
					},
					{
						countryCode:'968',
						name:'Oman (+968)',
					},
					{
						countryCode:'680',
						name:'Palau (+680)',
					},
					{
						countryCode:'507',
						name:'Panama (+507)',
					},
					{
						countryCode:'675',
						name:'Papua New Guinea (+675) ',
					},
					{
						countryCode:'595',
						name:'Paraguay (+595)',
					},
					{
						countryCode:'51',
						name:'Peru (+51)',
					},
					{
						countryCode:'63',
						name:'Philippines (+63) ',
					},
					{
						countryCode:'48',
						name:'Poland (+48)',
					},
					{
						countryCode:'351',
						name:'Portugal (+351)',
					},
					{
						countryCode:'1787',
						name:'Puerto Rico (+1787) ',
					},
					{
						countryCode:'974',
						name:'Qatar (+974)',
					},
					{
						countryCode:'262',
						name:'Reunion (+262)',
					},
					{
						countryCode:'40',
						name:'Romania (+40)',
					},
					{
						countryCode:'7',
						name:'Russia (+7)',
					},
					{
						countryCode:'250',
						name:'Rwanda (+250)',
					},
					{
						countryCode:'378',
						name:'San Marino (+378) ',
					},
					{
						countryCode:'239',
						name:'Sao Tome & Principe (+239) ',
					},
					{
						countryCode:'966',
						name:'Saudi Arabia (+966) ',
					},
					{
						countryCode:'221',
						name:'Senegal (+221)',
					},
					{
						countryCode:'381',
						name:'Serbia (+381)',
					},
					{
						countryCode:'248',
						name:'Seychelles (+248) ',
					},
					{
						countryCode:'232',
						name:'Sierra Leone (+232) ',
					},
					{
						countryCode:'65',
						name:'Singapore (+65)',
					},
					{
						countryCode:'421',
						name:'Slovak Republic (+421) ',
					},
					{
						countryCode:'386',
						name:'Slovenia (+386)',
					},
					{
						countryCode:'677',
						name:'Solomon Islands (+677) ',
					},
					{
						countryCode:'252',
						name:'Somalia (+252)',
					},
					{
						countryCode:'27',
						name:'South Africa (+27) ',
					},
					{
						countryCode:'34',
						name:'Spain (+34)',
					},
					{
						countryCode:'94',
						name:'Sri Lanka (+94)',
					},
					{
						countryCode:'290',
						name:'St. Helena (+290) ',
					},
					{
						countryCode:'1869',
						name:'St. Kitts (+1869) ',
					},
					{
						countryCode:'1758',
						name:'St. Lucia (+1758) ',
					},
					{
						countryCode:'249',
						name:'Sudan (+249)',
					},
					{
						countryCode:'597',
						name:'Suriname (+597)',
					},
					{
						countryCode:'268',
						name:'Swaziland (+268) ',
					},
					{
						countryCode:'46',
						name:'Sweden (+46)',
					},
					{
						countryCode:'41',
						name:'Switzerland (+41) ',
					},
					{
						countryCode:'963',
						name:'Syria (+963)',
					},
					{
						countryCode:'886',
						name:'Taiwan (+886)',
					},
					{
						countryCode:'7',
						name:'Tajikstan (+7)',
					},
					{
						countryCode:'66',
						name:'Thailand (+66)',
					},
					{
						countryCode:'228',
						name:'Togo (+228)',
					},
					{
						countryCode:'676',
						name:'Tonga (+676)',
					},
					{
						countryCode:'1868',
						name:'Trinidad & Tobago (+1868) ',
					},
					{
						countryCode:'216',
						name:'Tunisia (+216)',
					},
					{
						countryCode:'90',
						name:'Turkey (+90)',
					},
					{
						countryCode:'7',
						name:'Turkmenistan (+7)',
					},
					{
						countryCode:'993',
						name:'Turkmenistan (+993) ',
					},
					{
						countryCode:'1649',
						name:'Turks & Caicos Islands (+1649) ',
					},
					{
						countryCode:'688',
						name:'Tuvalu (+688)',
					},
					{
						countryCode:'256',
						name:'Uganda (+256)',
					},
					{
						countryCode:'380',
						name:'Ukraine (+380)',
					},
					{
						countryCode:'971',
						name:'United Arab Emirates (+971) ',
					},
					{
						countryCode:'598',
						name:'Uruguay (+598)',
					},
					{
						countryCode:'7',
						name:'Uzbekistan (+7)',
					},
					{
						countryCode:'678',
						name:'Vanuatu (+678)',
					},
					{
						countryCode:'379',
						name:'Vatican City (+379) ',
					},
					{
						countryCode:'58',
						name:'Venezuela (+58)',
					},
					{
						countryCode:'84',
						name:'Vietnam (+84)',
					},
					{
						countryCode:'1284',
						name:'Virgin Islands - British (+1284) ',
					},
					{
						countryCode:'1340',
						name:'Virgin Islands - US (+1340) ',
					},
					{
						countryCode:'681',
						name:'Wallis & Futuna (+681) ',
					},
					{
						countryCode:'969',
						name:'Yemen (North)(+969) ',
					},
					{
						countryCode:'967',
						name:'Yemen (South)(+967) ',
					},
					{
						countryCode:'260',
						name:'Zambia (+260)',
					},
					{
						countryCode:'263',
						name:'Zimbabwe (+263)',
					},
					{
						countryCode:'61',
						name:'Australia (+61)',
					},
				],
				penColor: 'black',
				penSize: 5,
				url: '',
				openSmooth: true
			}
		},
		onLoad(options) {
			this.formData.countryCode = this.regionData[this.regionIndex].countryCode;
			if(options && options['code']){
				var that = this;
				uni.getStorage({
					key: 'register_code_'+options['code'],
					success: function (res) {
						console.log(res);
						let registerData = res.data;
						that.formData.first_name = registerData.first_name
						that.formData.name = registerData.name
						that.formData.country_code = registerData.country_code
						that.formData.mobile = registerData.mobile
						that.formData.company_name = registerData.company_name
						that.formData.id = registerData.id
						that.formData.registration_code = registerData.registration_code
					}
				});
			}
		},
		watch:{
			stepsStatus(newValue,oldValue){
				if(newValue === 2){
					this.getOptionList();
				}
			},
			formData:{
				handler(newValue,oldValue){
					if(newValue.first_name != '' && newValue.name != '' && (newValue.mobile != '' && newValue.mobile.length >= 8)){
						this.isCanNext = true;
					}else{
						this.isCanNext = false;
					}
				},
				deep:true
			}
		},
		methods: {
			changeSignaturePopup(e) {
				console.log('mode：' + e.type + ',status：' + e.show);
			},
			openPopupToggle(type) {
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.paymentPopup.open('center')
			},
			closeSignaturePopup(){
				this.$refs.paymentPopup.close()
			},
			Signature(type) {
				if(type == 'openSmooth') {
					this.openSmooth = !this.openSmooth
					return
				}
				if (type == 'save') {
					let that = this;
					this.$refs.signatureRef.canvasToTempFilePath({
						success: (res) => {
							// 是否为空画板 无签名
							console.log(res.isEmpty)
							if(res.isEmpty){
								uni.showModal({
									showCancel:false,
									confirmText:'OK',
									// content:'Please agree the Terms And Conditions and Declaration！'
									content:'Please sign again.'
								});
								return
							}
							if(!that.termsSeleted){
								uni.showModal({
									showCancel:false,
									confirmText:'OK',
									content:'Please agree the Terms And Conditions.'
								});
								return
							}
							if(that.questionSeleted === 1 && !that.declarationSeleted){
								uni.showModal({
									showCancel:false,
									confirmText:'OK',
									content:'Please agree the Declaration.'
								});
								return
							}
							// 生成图片的临时路径
							// H5 生成的是base64
							// that.signatureUrl = res.tempFilePath
							pathToBase64(res.tempFilePath)
							.then(async base64 => {
								that.signatureUrl = base64;
							})
							.catch(error => {
								uni.showModal({
									showCancel:false,
									confirmText:'OK',
									content:'Image conversion failed, please try again.'
								});
							})
							this.$refs.paymentPopup.close();
						}
					})
					return
				}
				if(type == 'clear'){
					this.$refs.signatureRef.clear();
				}
			},
			changeTermsSelected(){
				if(this.termsSeleted == 1){
					this.termsSeleted = 0;
				}else{
					this.termsSeleted = 1;
				}
			},
			changeDeclarationSelected(){
				if(this.declarationSeleted == 1){
					this.declarationSeleted = 0;
				}else{
					this.declarationSeleted = 1;
				}
			},
			goHomePage:function(){
				uni.redirectTo({
					url:'/pages/index/index'
				})
			},
			bindPickerChange(e) {
				console.log(e.detail.value)
				this.regionIndex = e.detail.value
				this.formData['countryCode'] = this.regionData[this.regionIndex].countryCode;
			},
			resetFormData(){
				if(this.stepsStatus == 1){
					for(const key in this.formData){
						this.formData[key] = '';
					}
					this.formData['countryCode'] = this.regionData[this.regionIndex].countryCode;
				}else if(this.stepsStatus == 2){
					this.questionSeleted = 0;
				}else if(this.stepsStatus == 3){
					this.photoUrl = '';
				}else if(this.stepsStatus == 4){
					this.signatureUrl = '';
				}

				uni.showToast({
					title:'Succeed!',
					mask:true,
					icon:'success'
				})
			},
			backPrePage(){
				if(this.stepsStatus > 1){
					this.stepsStatus -= 1;
				}else{
					uni.redirectTo({
						url:'/pages/index/index'
					})
				}
			},
			changeQuestionSelected(value){
				this.questionSeleted = value;
			},
			goOptionPage(){
				if(this.stepsStatus === 3){
					if(this.photoUrl == ''){
						uni.showModal({
							showCancel:false,
							confirmText:'OK',
							content:'Please take a photo.'
						});
						return
					}
				}else if(this.stepsStatus === 2){
					if(!this.questionSeleted){
						uni.showModal({
							showCancel:false,
							confirmText:'OK',
							content:'Please answer the question.'
						});
						return
					}
				}

				this.stepsStatus += 1;
			},
			cleanAll(){
				this.resetFormData();
			},
			getOptionList: function(){
				uni.showLoading({
					title: 'LOADING...'
				})
				httpApi.getOptionList({

				}).then(res => {
					console.log('list：', res)
					uni.hideLoading();
					let result = res.data || {}
					try{
						if(result.error_code === '0') {
							this.optionData = result.data;
							return;
						}else{
							throw new Error('Request failed, please try again.');
						}
					}catch(err){
						uni.showToast({
							title: err.message,
							icon: 'error'
						});
					}
				}).catch(err => {
					uni.hideLoading()
					console.error(err);
					uni.showToast({
						title: "Loading failed, please try again.",
						icon: 'error'
					});
				})
			},
			openCamera:function(){
				let that = this;
				// 扩展API加载完毕后调用onPlusReady回调函数
				// #ifdef APP-PLUS
				// 扩展API加载完毕，现在可以正常调用扩展API
				var cmr = plus.camera.getCamera(2);
				var res = cmr.supportedImageResolutions[0];
				var fmt = cmr.supportedImageFormats[0];
				console.log("Resolution: "+res+", Format: "+fmt);
				cmr.captureImage( function( path ){
						console.log( "Capture image success: " + path );
						uni.getImageInfo({
							src:path,
							success:function(path){
								console.log(path);
								pathToBase64(path.path)
								.then(async base64 => {
									that.photoUrl = base64;
								})
								.catch(error => {
									uni.showModal({
										showCancel:false,
										confirmText:'OK',
										content:'Image conversion failed, please try again.'
									});
								})
							},
							fail:function(error){
								console.log(error);
								uni.showModal({
									showCancel:false,
									confirmText:'OK',
									content:'Image conversion failed, please try again.'
								});
							}
						})
					},
					function( error ) {
						console.log( "Capture image failed: " + error.message );
					},
					{resolution:res,format:fmt}
				);
				// #endif
				return false;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: function (res) {
						console.log(JSON.stringify(res.tempFilePaths));
						//that.photoUrl = res.tempFilePaths;

						uni.getImageInfo({
							src:res.tempFilePaths[0],
							success:function(path){
								console.log(path);
								pathToBase64(path.path)
								.then(async base64 => {
									that.photoUrl = base64;
								})
								.catch(error => {
									uni.showModal({
										showCancel:false,
										confirmText:'OK',
										content:'Image conversion failed, please try again.'
									});
								})
							},
							fail:function(error){
								console.log(error);
								uni.showModal({
									showCancel:false,
									confirmText:'OK',
									content:'Image conversion failed, please try again.'
								});
							}
						})

					},
					fail:function(error) {
						console.log(error);
					}
				});
			},
			submitForm(){
				this.formData.camera.data = this.photoUrl;
				this.formData.camera.name = '1.png';
				this.formData.camera.size = '1';
				this.formData.camera.type = 'image/png';
				if(!this.formData.camera.data){
					uni.showModal({
						showCancel:false,
						confirmText:'OK',
						// content:'Please agree the Terms And Conditions and Declaration！'
						content:'Please return to the previous page and take a photo.'
					});
					return
				}
				this.formData.signature.data = this.signatureUrl;
				this.formData.signature.name = '1.png';
				this.formData.signature.size = '1';
				this.formData.signature.type = 'image/png';
				if(!this.formData.signature.data){
					uni.showModal({
						showCancel:false,
						confirmText:'OK',
						// content:'Please agree the Terms And Conditions and Declaration！'
						content:'Please sign again.'
					});
					return
				}
				let questionData = {};
				questionData.answer = this.questionSeleted == 1 ? "1" : "0";
				questionData.id = 0;
				questionData.no = 1;
				questionData.question = this.questionTitle;
				this.formData.question[0] = questionData;
				console.log(this.formData);
				uni.showLoading({
					title: 'LOADING...'
				})
				httpApi.setVisitLog(this.formData).then(res => {
					console.log('response：', res)
					uni.hideLoading();
					let result = res.data || {}
					try{
						if(result.error_code === '0') {
							uni.showToast({
								title: "succeed",
								icon: 'success'
							});
							setTimeout(function(){
								uni.redirectTo({
									url:'/pages/index/index',
									success:function(){
										uni.$emit('submitSuccess');
									}
								})
							},2000)
							return;
						}else{
							throw new Error('Request failed, please try again.');
						}
					}catch(err){
						uni.showToast({
							title: err.message,
							icon: 'error'
						});
					}
				}).catch(err => {
					uni.hideLoading()
					console.error(err);
					uni.showToast({
						title: "Loading failed, please try again.",
						icon: 'error'
					});
				})
			}
		}
	}
</script>

<style lang="scss">
	.content-header{
		padding-top: 30px;
		width: 100%;
		.header-logo{
			border-top: 1px solid #ccc;
			height: 200px;
			width: 100%;
			background-image: url('../../static/images/img_logo_b.png');
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
		}
		.steps-box{
			height: 120px;
			width: 100%;
			background-image: url('../../static/images/form-step1.png');
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;

			&.steps-1,
			&.steps-2{
				background-image: url('../../static/images/form-step1.png');
			}
			&.steps-3{
				background-image: url('../../static/images/form-step2.png');
			}
			&.steps-4{
				background-image: url('../../static/images/form-step3.png');
			}
		}
	}
	.content-body{
		height: calc(100vh - 470px);
		overflow-y: hidden;
		border-bottom: 1px solid #ccc;
		.information-title{
			font-size: 40px;
			margin-bottom: 20px;
			text-align: center;
		}
		.information-form{
			margin-bottom: 60px;
			padding: 10px 40px;
		}
		.uni-forms-item{
			border-bottom: 1px solid #ccc;
			uni-input{
				font-size: 32px;
			}
			/deep/ .uni-forms-item__content{
				font-size: 32px;
				line-height: 1.4rem;
			}
		}
		.purpose-item{
			.purpose-question-box{
				display: flex;
				align-items: center;
				.purpose-index{
					width: 50px;
				}
				.purpose-question{
					width: calc(100% - 150px);
				}
				.purpose-answer{
					width: 100px;

					uni-radio-group{
						display: flex;
						flex-direction: column;
						.uni-label-pointer{
							margin-bottom: 15px;
							padding-bottom: 5px;
							uni-text{
								padding-bottom: 10px;
								border-bottom: 1px solid #ccc;
							}
						}
					}
				}
			}
			.purpose-answer-box{
				padding-left: 50px;
				padding-right: 100px;
				.purpose-question-info-title{
					font-size: 26px;
					font-weight: bold;
					text-align: center;
					text-decoration: underline;
					margin-bottom: 15px;
				}
			}
		}
		.information-photo{
			display: flex;
			align-items: center;
			justify-content: center;
			.photo-bg{
				width: 100%;
				height: 280px;
				background-image: url('../../static/images/ico_photo.png');
				background-position: center;
				background-repeat: no-repeat;
				background-size: contain;
			}
			.photo-box{
				width: 100%;
				img{
					max-width: 100%;
					height: 280px;
					margin: 0 auto;
					display: block;
				}
			}
		}
		.information-signature{
			.photo-bg{
				width: 100%;
				height: 280px;
				background-image: url('../../static/images/ico_signature.png');
				background-position: center;
				background-repeat: no-repeat;
				background-size: contain;
			}
			.photo-box{
				width: 100%;
				img{
					max-width: 100%;
					height: 280px;
					margin: 0 auto;
					display: block;
				}
			}
		}
	}
	.popup-content{
		width: calc(100vw - 100px);
		padding: 0px 20px 20px;
		box-shadow: 0px 3px 6px #00000029;
		border-radius: 12px;
		background-color: #fff;
		position: relative;
		box-sizing: border-box;
		.confirm-signature-header{
			padding: 20px;
			font-size: 32px;
			font-weight: bold;
			text-align: center;
		}
		.signature-close-btn{
			color: royalblue;
			position: absolute;
			right: 10px;
			top: 0px;
			&::after{
				content: '×';
				font-size: 40px;
			}
		}
		.scroll-Y{
			width: 100%;
			max-height: 280px;
			padding: 20px 5px;
			word-break: break-all;
		}
		.confirm-signature-box{
			width: 100%;
			height: 280px;
			border: 1px dashed #ccc;
			.lime-signature{
				width: 100%!important;
				height: 100%!important;
			}
		}
		.privacy-clause-box{
			display: flex;
			flex-direction: column;
			.uni-label-pointer{
				width: 100%;
				margin-top: 20px;
				display: flex;
				uni-text{
					display: inline-block;
					width: 100%;
					padding-bottom: 5px;
					border-bottom: 1px solid #ccc;
				}
			}
		}
		.confirm-signature-footer{
			display: flex;
			justify-content: space-between;
			padding-top: 20px;
			.clean-signature-btn,
			.confirm-signature-btn{
				width: auto;
				display: inline-block;
				padding: 10px 80px;
				background-color: #D52128;
				color: #fff;
				margin-left: 0;
				margin-right: 0;
			}
		}

	}
	.content-footer{
		.btn-group{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			.btn{
				width: 33.33%;
				background-color: #D52128;
				color: #fff;
				padding: 5px 0px;
				margin: 20px 40px;
				font-size: 25px;
				border-radius: 0px;
				&[disabled=true]{
					color: #ccc;
				}
			}
		}
	}
	.uni-forms-item-box {
		display: flex;
		.uni-forms-item-list{
			&:first-child{
				margin-top: 12px;
				margin-right: 5px;
			}
			&:last-child{
				flex: 1;
			}
		}
	}
</style>
