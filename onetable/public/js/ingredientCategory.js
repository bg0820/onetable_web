function categoryChange(e) {
  console.log(e.value);
  var detail_a = ["전체"];
  var detail_b = ["전체", "수박/메론/참외", "토마토/자두/복숭아/포도", "바나나/오렌지/외국과일", "사과/배",
  "냉동/간편과일", "키위/참다래", "딸기/블루베리/매실/기타", "감귤/한라봉", "감/곶감", "과일세트"];

  var detail_c = ["전체", "오이/가지/호박/옥수수", "양파/마늘/생강/파", "고구마/감자", "두부/콩나물",
  "양배추/브로콜리/특수채소", "상추/깻잎/쌈채소", "파프리카/피망/고추", "당근/우엉/연근/마/야콘",
  "새송이/표고/버섯류", "샐러드/새싹/무순/드레싱", "배추/무/김장채소", "나물/미나리/쑥갓/시금치", "간편채소/주스/절임채소", "인삼/더덕/한차/약선재료"];

  var detail_d = ["전체", "쌀 중량별", "쌀 품종별", "쌀 지역별", "찹쌀/현미/흑미", "콩/보리", "혼합곡/기능성잡곡", "수수/조/깨/잡곡", "즉석도정미", "수입잡곡", "곡물가공", "선물세트"];

  var detail_e = ["전체", "땅콩/대추/건과/견과류", "멸치/천연조미료", "김/기타해조류", "미역/다시마/황태", "오징어/쥐포/육포/어포스낵"];

  var detail_f = ["전체", "돼지고기", "소고기(국내산)", "수입육", "계란/알류/가공란", "닭/오리고기", "양념육/가공육", "축산 선물세트"];

  var detail_g = ["전체", "고등어/갈치/조기/장어", "새우/게/기타해산물", "오징어/낙지", "전복/굴/조개류", "삼치/대구/명태/간편반찬", "생선회/어란", "수산선물세트"];

  var detail_h = ["전체", "우유/요구르트/치즈/냉장음료", "만두/돈까스/떡갈비/냉동", "면/떡/국/찌개/냉장",
  "아이스크림/빙과/디저트/푸딩", "김치/반찬/젓갈", "햄/어묵/단무지/유부/맛살", "두부/콩나물/샐러드/묵", "불고기/훈제오리/델리"];

  var detail_i = ["전체", "다이어트/피부건강/헬스", "성분별건강식품", "기능별건강식품", "대상별건강식품", "전통건강식품", "친환경신선식품", "친환경가공식품", "유기농신선식품", "유기농가공식품"];

  var detail_j = ["전체", "라면/컵라면/면식품", "밥류/카레/짜장/즉석식품", "참치/스팸/잼/통조림류", "파스타/소스/드레싱",
  "간장/고추장/된장/쌈장", "밀가루/설탕/소금/조미료", "식용류/참기름", "수입 통조림/조미료/대용식", "통조림/조미료 선물세트", "빙수재료"];

  var detail_k = ["전체", "스낵", "쿠키/비스킷/크래커", "파이/케익", "식빵/호빵/찐빵/빵",
  "베이커리/생지/쨈", "시리얼", "초콜릿/초코바", "소시지/원물간식", "사탕/젤리/양갱/껌", "한과/화과자/전통과자"];

  var detail_ㅣ = ["전체", "국산생수", "수입생수", "커피/티/건강음료", "커피믹스/원두/캡슐/커피세트", "과일/야채음료",
  "콜라/사이다/환타/스포츠음료", "탄산음료/심층수/수입음료", "두유", "녹차/홍차/아이스티/코코아", "분유/유아식", "전통주"];

  var detail_m = ["전체", "밑반찬", "국/탕", "아이반찬", "밀키트 (요리별)", "밀키트 (나라별)", "밀키트 (재료별)", "델리"];

let value = e.value;
var d = null;
	if(value == 'a') d = detail_a;
	else if(value == "b")  d = detail_b;
	else if(value == "c")  d = detail_c;
	else if(value == "d")  d = detail_d;
	else if(value == "e")  d = detail_e;
	else if(value == "f")  d = detail_f;
	else if(value == "g")  d = detail_g;
	else if(value == "h")  d = detail_h;
	else if(value == "i")  d = detail_i;
	else if(value == "j")  d = detail_j;
	else if(value == "k")  d = detail_k;
	else if(value == "l")  d = detail_l;
	else if(value == "m")  d = detail_m;

let subCategory = document.getElementById('detail');

$(subCategory).empty();
for(var i = 0 ; i < d.length; i++)
{
  $(subCategory).append("<option value='" + d[i] +"'>" + d[i] + "</option>" );
}

/*

  target.options.length = 0;

  for (x in d) {
    var opt = document.createElement("option");
    opt.value = d[x];
    opt.innerHTML = d[x];
    target.appendChild(opt);
  }*/
}
