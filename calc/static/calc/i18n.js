/* Client-side KO/EN/ZH translation toggle. No server changes required. */
(function () {
  const DICT = {
    // 공통 / nav
    brand: { ko: "Nurse Helper", en: "Nurse Helper", zh: "Nurse Helper" },

    // home.html
    home_title: { ko: "SEONA의 슬기로운 간호사 생활", en: "SEONA's Smart Nursing Life", zh: "SEONA的智慧护理生活" },
    home_subtitle: { ko: "언제나 멋진 언니를 항상 응원해 🪄✨", en: "Always cheering for you 🪄✨", zh: "永远为你加油 🪄✨" },
    home_ivtime_title: { ko: "IV 주입 시간 계산", en: "IV Infusion Time", zh: "IV 输液时间计算" },
    home_ivtime_desc: { ko: "시작·종료 시간과 주입 간격을 기준으로<br>IV 주입 시간을 간편하게 계산해요.", en: "Quickly calculate IV infusion time<br>from start/end times and intervals.", zh: "根据开始·结束时间和间隔<br>轻松计算 IV 输液时间。" },
    home_infusion_title: { ko: "수액 계산", en: "Infusion Calculator", zh: "输液计算" },
    home_infusion_desc: { ko: "시작/종료 시간과 총 용량만 입력하면<br>gtt/min, sec/방울이 뚝딱!", en: "Enter start/end time and volume<br>to get gtt/min and sec/drop instantly!", zh: "输入开始/结束时间和总容量<br>即可算出 gtt/min 和每滴秒数！" },
    home_drug_title: { ko: "약물 계산", en: "Drug Calculator", zh: "药物计算" },
    home_drug_desc: { ko: "농도·용량·시간 기반으로<br>속도와 용량을 쉽게 변환", en: "Convert rate and volume<br>from concentration, dose, and time.", zh: "根据浓度·剂量·时间<br>轻松换算速度与剂量" },
    home_formulas_title: { ko: "공식 모음", en: "Formula Sheet", zh: "公式汇总" },
    home_formulas_desc: { ko: "IV 계산 공식과 드롭팩터 표<br>예시 케이스까지 한눈에", en: "IV formulas and drop-factor tables<br>with examples, all in one place.", zh: "IV 计算公式与滴系数表<br>及示例一览无余" },
    home_start_cta: { ko: "바로 시작하기 →", en: "Start now →", zh: "立即开始 →" },
    home_formulas_cta: { ko: "공식 보러가기 →", en: "View formulas →", zh: "查看公式 →" },
    home_tip_title: { ko: "💡 Tip", en: "💡 Tip", zh: "💡 提示" },
    home_tip_body: { ko: "<strong>Day, Evening, Night</strong> 버튼을 누르면<br>듀티 시간이 자동으로 설정돼요! 편하게 사용해보세요 🌟", en: "Tap <strong>Day, Evening, Night</strong><br>to auto-fill duty hours. Enjoy! 🌟", zh: "点击 <strong>Day、Evening、Night</strong><br>即可自动设置班次时间，轻松使用 🌟" },

    // infusion.html
    infusion_h1: { ko: "수액 계산", en: "Infusion Calculator", zh: "输液计算" },
    infusion_intro: {
      ko: "시작–종료 <b>시간(HH:MM)</b>과 <b>수액 총 용량(mL)</b>을 입력하면 필요한 <b>속도(mL/h)</b>, <b>1분당 방울수</b>, <b>1초당 몇 방울</b>, <b>1방울 떨어지는 데 걸리는 시간</b>을 자동 계산합니다. 드립 팩터는 성인 기본값인 <b>20 gtt/mL</b>로 계산합니다.",
      en: "Enter start/end <b>time (HH:MM)</b> and <b>total volume (mL)</b> to automatically get the required <b>rate (mL/h)</b>, <b>drops/min</b>, <b>drops/sec</b>, and <b>seconds per drop</b>. Uses the adult default drop factor of <b>20 gtt/mL</b>.",
      zh: "输入开始–结束<b>时间 (HH:MM)</b>与<b>总容量 (mL)</b>，即可自动算出所需的<b>速度 (mL/h)</b>、<b>每分钟滴数</b>、<b>每秒滴数</b>与<b>每滴间隔时间</b>。滴系数按成人默认值 <b>20 gtt/mL</b> 计算。"
    },
    infusion_start_label: { ko: "시작 시간 (HH:MM)", en: "Start time (HH:MM)", zh: "开始时间 (HH:MM)" },
    infusion_end_label: { ko: "종료(마감) 시간 (HH:MM)", en: "End time (HH:MM)", zh: "结束时间 (HH:MM)" },
    infusion_volume_label: { ko: "수액 총 용량 (mL)", en: "Total volume (mL)", zh: "总容量 (mL)" },
    calc_btn: { ko: "계산하기", en: "Calculate", zh: "计算" },
    from_now_6h: { ko: "지금부터 6시간", en: "6 hours from now", zh: "从现在起 6 小时" },
    from_now_12h: { ko: "지금부터 12시간", en: "12 hours from now", zh: "从现在起 12 小时" },
    from_now_24h: { ko: "지금부터 24시간", en: "24 hours from now", zh: "从现在起 24 小时" },
    error_title: { ko: "오류", en: "Error", zh: "错误" },
    result_title: { ko: "결과", en: "Result", zh: "结果" },
    infusion_total_time: { ko: "총 주입 시간:", en: "Total infusion time:", zh: "总输液时间：" },
    hours_unit: { ko: "시간", en: "hours", zh: "小时" },
    infusion_end_adjusted: { ko: "종료(보정):", en: "Adjusted end:", zh: "结束(校正)：" },
    infusion_required_rate: { ko: "필요한 속도:", en: "Required rate:", zh: "所需速度：" },
    infusion_drop_basis: { ko: "방울 기준 (DF=20)", en: "Drop basis (DF=20)", zh: "滴数基准 (DF=20)" },
    infusion_gtt_min: { ko: "1분당 방울 수 (gtt/min):", en: "Drops per minute (gtt/min):", zh: "每分钟滴数 (gtt/min)：" },
    infusion_drops_sec: { ko: "1초당 방울 수:", en: "Drops per second:", zh: "每秒滴数：" },
    drops_unit: { ko: "방울", en: "drops", zh: "滴" },
    infusion_sec_per_drop: { ko: "1방울 떨어지는 데 걸리는 시간:", en: "Time per drop:", zh: "每滴所需时间：" },
    sec_unit: { ko: "초", en: "sec", zh: "秒" },
    caution_label: { ko: "주의", en: "Caution", zh: "注意" },
    infusion_caution_text: { ko: "이 계산은 참고용이며 항상 기관 프로토콜 및 처방을 우선하세요.", en: "For reference only — always follow institutional protocol and prescriptions.", zh: "本计算仅供参考，请务必以机构规程与医嘱为准。" },
    infusion_easy_explain: {
      ko: "쉽게 말해, 1초에 {drops} 방울 떨어지고 1방울 떨어지는 데 약 {secs}초가 걸린다는 의미입니다.",
      en: "In other words, {drops} drops fall per second, and each drop takes about {secs} seconds.",
      zh: "简单来说，每秒滴下 {drops} 滴，每滴大约需要 {secs} 秒。"
    },

    // drug.html
    drug_h1: { ko: "약물 계산", en: "Drug Calculator", zh: "药物计算" },
    drug_intro: { ko: "농도(mg/mL), 필요한 용량(mL), 속도(mL/hr), mg/hr 등을 계산합니다. 실제 병동에서 자주 쓰는 4가지 연산을 모두 포함합니다.", en: "Calculate concentration (mg/mL), required volume (mL), rate (mL/hr), and mg/hr. Covers the 4 calculations most used on the ward.", zh: "计算浓度 (mg/mL)、所需容量 (mL)、速度 (mL/hr) 与 mg/hr。涵盖病房常用的 4 种运算。" },
    drug_card1_title: { ko: "1) 농도 계산 (mg/mL)", en: "1) Concentration (mg/mL)", zh: "1) 浓度计算 (mg/mL)" },
    total_mg_label: { ko: "총 용량 (mg)", en: "Total dose (mg)", zh: "总剂量 (mg)" },
    total_ml_label: { ko: "총 부피 (mL)", en: "Total volume (mL)", zh: "总体积 (mL)" },
    drug_concentration_result: { ko: "농도:", en: "Concentration:", zh: "浓度：" },
    drug_card2_title: { ko: "2) 필요한 용량 계산 (mg → mL)", en: "2) Required Volume (mg → mL)", zh: "2) 所需容量计算 (mg → mL)" },
    desired_mg_label: { ko: "원하는 용량 (mg)", en: "Desired dose (mg)", zh: "所需剂量 (mg)" },
    conc_label: { ko: "농도 (mg/mL)", en: "Concentration (mg/mL)", zh: "浓度 (mg/mL)" },
    drug_needed_ml_suffix: { ko: "mL 필요", en: "mL needed", zh: "mL 所需" },
    drug_card3_title: { ko: "3) 속도 계산 (mL/hr)", en: "3) Rate (mL/hr)", zh: "3) 速度计算 (mL/hr)" },
    rate_desired_mg_label: { ko: "투여할 용량 (mg)", en: "Dose to administer (mg)", zh: "拟给药剂量 (mg)" },
    rate_hours_label: { ko: "투약 시간 (시간)", en: "Duration (hours)", zh: "给药时长 (小时)" },
    drug_total_needed: { ko: "총 필요량:", en: "Total needed:", zh: "总所需量：" },
    drug_rate_label: { ko: "속도:", en: "Rate:", zh: "速度：" },
    drug_card4_title: { ko: "4) mg/hr 계산 (속도 → 투여량)", en: "4) mg/hr (Rate → Dose)", zh: "4) mg/hr 计算 (速度 → 给药量)" },
    rate_mlh_label: { ko: "속도 (mL/hr)", en: "Rate (mL/hr)", zh: "速度 (mL/hr)" },
    drug_dose_result: { ko: "약물 투여량:", en: "Drug dose:", zh: "给药量：" },
    drug_footer_note: { ko: "※ 본 계산기는 교육 및 참고용입니다. 최종 처방은 기관 프로토콜을 따르세요.", en: "※ For education/reference only. Follow institutional protocol for final orders.", zh: "※ 本计算器仅供教学与参考，最终医嘱请以机构规程为准。" },

    // formulas.html
    formulas_h1: { ko: "공식 모음", en: "Formula Sheet", zh: "公式汇总" },
    formulas_intro: { ko: "수액/약물 계산에 자주 쓰이는 핵심 공식들을 모아두었습니다. 실제 계산은 상단 탭의 “💧 수액 계산”, “💊 약물 계산” 메뉴에서 진행하세요.", en: "Key formulas commonly used for fluid/drug calculations. Use the “💧 Infusion” / “💊 Drug” tabs above for actual calculations.", zh: "汇总了输液/药物计算中常用的核心公式。实际计算请使用上方“💧 输液计算”“💊 药物计算”菜单。" },
    formulas_sec1_title: { ko: "1) 수액 · 시간 · 속도 관계", en: "1) Volume · Time · Rate", zh: "1) 输液·时间·速度关系" },
    formulas_sec1_body: {
      ko: "• 시간으로 처방: 전체 수액량 ÷ 유지시간 = <b>mL/hr</b><br>• 유지시간: 전체 수액량 ÷ mL/hr<br>• 하루 수액 개수: 24 ÷ 유지시간<br>• 다음 수액 연결시간: 시작시간 + 유지시간<br>• 1방울 = 0.05mL (DF=20 기준)<br>• sec/1방울 = <b>180 ÷ mL/hr</b> (DF=20 기준)",
      en: "• Rate = total volume ÷ duration = <b>mL/hr</b><br>• Duration = total volume ÷ mL/hr<br>• Bags per day = 24 ÷ duration<br>• Next bag start = start time + duration<br>• 1 drop = 0.05 mL (DF=20)<br>• sec/drop = <b>180 ÷ mL/hr</b> (DF=20)",
      zh: "• 按时间处方：总输液量 ÷ 维持时间 = <b>mL/hr</b><br>• 维持时间：总输液量 ÷ mL/hr<br>• 每日输液袋数：24 ÷ 维持时间<br>• 下袋连接时间：开始时间 + 维持时间<br>• 1 滴 = 0.05mL（DF=20 时）<br>• 秒/滴 = <b>180 ÷ mL/hr</b>（DF=20 时）"
    },
    formulas_sec2_title: { ko: "2) 약물 계산 핵심 공식", en: "2) Key Drug Formulas", zh: "2) 药物计算核心公式" },
    formulas_sec2_body: {
      ko: "• 1g = 1,000mg = 1,000,000mcg<br>• 1mL에 들어있는 약물량 = 총용량 ÷ 총부피<br>• A : B = C : D → A×D = B×C (외항×외항 = 내항×내항)<br>• 약물속도(mL/hr) = (투여량 mg ÷ 농도 mg/mL) ÷ 시간(hr)",
      en: "• 1g = 1,000mg = 1,000,000mcg<br>• Drug per mL = total dose ÷ total volume<br>• A : B = C : D → A×D = B×C<br>• Rate (mL/hr) = (dose mg ÷ concentration mg/mL) ÷ time (hr)",
      zh: "• 1g = 1,000mg = 1,000,000mcg<br>• 每 mL 药量 = 总剂量 ÷ 总体积<br>• A : B = C : D → A×D = B×C<br>• 给药速度(mL/hr) = (剂量 mg ÷ 浓度 mg/mL) ÷ 时间(hr)"
    },
    formulas_sec3_title: { ko: "3) 자주 쓰는 mL/hr → 초/1방울", en: "3) mL/hr → sec/drop (common)", zh: "3) 常用 mL/hr → 秒/滴" },
    sec_per_drop_col: { ko: "초당 1방울", en: "sec/drop", zh: "秒/滴" },
    formulas_sec4_title: { ko: "4) 자주 쓰는 용량·시간별 속도", en: "4) Common Volume/Time → Rate", zh: "4) 常用容量·时长对应速度" },
    volume_col: { ko: "용량(mL)", en: "Volume (mL)", zh: "容量 (mL)" },
    time_col: { ko: "시간", en: "Time", zh: "时间" },
    required_rate_col: { ko: "필요 속도(mL/hr)", en: "Required rate (mL/hr)", zh: "所需速度 (mL/hr)" },

    // ivtime.html
    ivtime_title: { ko: "수액 시간 계산기", en: "IV Time Calculator", zh: "输液时间计算器" },
    ivtime_h1: { ko: "수액 시간, 빠르게 계산해요", en: "Calculate IV time, fast", zh: "快速计算输液时间" },
    ivtime_subtitle: { ko: "시작·종료 시간의 차이와 여러 수액의 연결 시간을 자동으로 계산합니다.", en: "Automatically calculates the gap between start/end times and connection times for multiple bags.", zh: "自动计算开始·结束时间差与多袋输液的连接时间。" },
    ivtime_sec1_title: { ko: "시작 → 종료 시간", en: "Start → End time", zh: "开始 → 结束时间" },
    ivtime_sec1_desc: { ko: "두 시각 사이 총 소요 시간을 계산합니다.", en: "Calculates total time between two clock times.", zh: "计算两个时刻之间的总时长。" },
    start_time_label: { ko: "시작 시간", en: "Start time", zh: "开始时间" },
    end_time_label: { ko: "종료 시간", en: "End time", zh: "结束时间" },
    swap_time_btn: { ko: "시간 바꾸기", en: "Swap times", zh: "交换时间" },
    total_duration_label: { ko: "총 소요 시간", en: "Total duration", zh: "总时长" },
    ivtime_example1: { ko: "예시: 07:25 시작 → 11:15 종료 = <b>3시간 50분</b>", en: "Example: 07:25 start → 11:15 end = <b>3h 50m</b>", zh: "示例：07:25 开始 → 11:15 结束 = <b>3小时50分</b>" },
    ivtime_sec2_title: { ko: "연속 수액 연결 시간", en: "Sequential IV Schedule", zh: "连续输液连接时间" },
    ivtime_sec2_desc: { ko: "마지막 종료 시각을 기준으로 각 수액 시작 시각을 역산합니다.", en: "Works backward from the final end time to each bag's start time.", zh: "以最终结束时间为基准，反推各袋输液的开始时间。" },
    target_end_label: { ko: "전체 종료 예정 시간", en: "Planned overall end time", zh: "预计总结束时间" },
    add_iv_btn: { ko: "＋ 수액 추가", en: "＋ Add bag", zh: "＋ 添加输液袋" },
    calc_schedule_btn: { ko: "연결 시간 계산", en: "Calculate schedule", zh: "计算连接时间" },
    overall_start_label: { ko: "전체 시작 예정 시간", en: "Planned overall start time", zh: "预计总开始时间" },
    ivtime_example2: { ko: "기본 예시: 1번 수액 1시간 + 2번 수액 1시간 30분, 11:50 종료 → <b>09:20 시작</b>", en: "Default example: Bag 1 1h + Bag 2 1h30m, end 11:50 → <b>start 09:20</b>", zh: "默认示例：1号袋1小时 + 2号袋1小时30分，11:50结束 → <b>09:20开始</b>" },
    ivtime_notice: { ko: "※ 시간 관리 참고용입니다. 실제 투여 순서·속도·처방은 의료기관 지침과 처방을 우선하세요.", en: "※ For time-management reference only. Follow institutional guidelines and orders for actual sequence/rate.", zh: "※ 仅供时间管理参考。实际给药顺序·速度·医嘱请以机构指引为准。" },

    // 서버에서 렌더링되는 고정 에러 메시지 (calc/views.py). data-i18n-src="errors" 요소를
    // 원문(ko) 기준으로 매칭해 번역합니다.
    err_infusion_start_required: { ko: "시작 시간(HH:MM)을 입력하세요.", en: "Please enter a start time (HH:MM).", zh: "请输入开始时间 (HH:MM)。" },
    err_infusion_end_required: { ko: "종료 시간(HH:MM)을 입력하세요.", en: "Please enter an end time (HH:MM).", zh: "请输入结束时间 (HH:MM)。" },
    err_infusion_volume_required: { ko: "수액 총 용량(mL)을 입력하세요.", en: "Please enter the total volume (mL).", zh: "请输入总容量 (mL)。" },
    err_infusion_start_format: { ko: "시작 시간 형식이 올바르지 않습니다. (예: 07:00)", en: "Invalid start time format. (e.g. 07:00)", zh: "开始时间格式不正确。（例：07:00）" },
    err_infusion_end_format: { ko: "종료 시간 형식이 올바르지 않습니다. (예: 15:00)", en: "Invalid end time format. (e.g. 15:00)", zh: "结束时间格式不正确。（例：15:00）" },
    err_infusion_volume_positive: { ko: "총 용량(mL)은 0보다 커야 합니다.", en: "Total volume (mL) must be greater than 0.", zh: "总容量 (mL) 必须大于 0。" },
    err_infusion_volume_number: { ko: "총 용량(mL)을 숫자로 입력하세요.", en: "Please enter the total volume (mL) as a number.", zh: "请输入数字形式的总容量 (mL)。" },
    err_infusion_end_before_start: { ko: "종료가 시작과 같거나 이전입니다.", en: "End time is the same as or before the start time.", zh: "结束时间等于或早于开始时间。" },
    err_drug_conc_inputs: { ko: "총 용량(mg)과 총 부피(mL)를 올바르게 입력하세요.", en: "Please enter valid total dose (mg) and total volume (mL).", zh: "请正确输入总剂量 (mg) 与总体积 (mL)。" },
    err_drug_required_ml_inputs: { ko: "원하는 용량(mg)과 농도(mg/mL)를 올바르게 입력하세요.", en: "Please enter valid desired dose (mg) and concentration (mg/mL).", zh: "请正确输入所需剂量 (mg) 与浓度 (mg/mL)。" },
    err_drug_rate_inputs: { ko: "용량·농도·시간을 올바르게 입력하세요.", en: "Please enter valid dose, concentration, and time.", zh: "请正确输入剂量·浓度·时间。" },
    err_drug_mg_hr_inputs: { ko: "속도(mL/hr)와 농도(mg/mL)를 올바르게 입력하세요.", en: "Please enter valid rate (mL/hr) and concentration (mg/mL).", zh: "请正确输入速度 (mL/hr) 与浓度 (mg/mL)。" },
    err_formulas_vt_inputs: { ko: "전체 수액량(mL)과 유지시간(시간)을 올바른 숫자로 입력하세요.", en: "Please enter valid numbers for total volume (mL) and duration (hours).", zh: "请输入正确的总输液量 (mL) 与维持时间（小时）数值。" },
    err_formulas_rate_inputs: { ko: "속도(mL/hr)와 드립 팩터(gtt/mL)를 올바른 숫자로 입력하세요.", en: "Please enter valid numbers for rate (mL/hr) and drop factor (gtt/mL).", zh: "请输入正确的速度 (mL/hr) 与滴系数 (gtt/mL) 数值。" },

    // ivtime.html JS 동적 문구
    js_enter_both_times: { ko: "시작 시간과 종료 시간을 모두 입력해 주세요.", en: "Please enter both the start and end times.", zh: "请输入开始时间和结束时间。" },
    js_total_prefix: { ko: "총", en: "Total", zh: "共" },
    js_next_day_suffix: { ko: " · 다음 날 종료로 계산", en: " · calculated as next-day end", zh: " · 按次日结束计算" },
    js_hour_unit: { ko: "시간 ", en: "h ", zh: "小时" },
    js_minute_unit: { ko: "분", en: "m", zh: "分" },
    js_zero_minutes: { ko: "0분", en: "0m", zh: "0分" },
    js_iv_name_label: { ko: "수액 이름", en: "Bag name", zh: "输液名称" },
    js_hour_label: { ko: "시간", en: "Hour", zh: "小时" },
    js_minute_label: { ko: "분", en: "Min", zh: "分钟" },
    js_iv_name_suffix: { ko: "번 수액", en: " bag", zh: "号袋" },
    js_delete_title: { ko: "삭제", en: "Delete", zh: "删除" },
    js_enter_target_end: { ko: "전체 종료 예정 시간을 입력해 주세요.", en: "Please enter the planned overall end time.", zh: "请输入预计总结束时间。" },
    js_invalid_time_for: { ko: "의 시간을 올바르게 입력해 주세요.", en: ": please enter a valid time.", zh: "：请输入正确的时间。" },
    js_total_duration_prefix: { ko: "총 소요 시간:", en: "Total duration:", zh: "总时长：" },
    js_end_suffix: { ko: "· 종료", en: "· end", zh: "· 结束" },
  };

  const SUPPORTED = ["ko", "en", "zh"];
  const STORAGE_KEY = "nh_lang";
  const HTML_LANG = { ko: "ko", en: "en", zh: "zh-Hans" };

  function detectDefaultLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
    const nav = (navigator.language || "ko").toLowerCase();
    if (nav.startsWith("zh")) return "zh";
    if (nav.startsWith("en")) return "en";
    return "ko";
  }

  function t(key, lang) {
    const entry = DICT[key];
    if (!entry) return null;
    return entry[lang] != null ? entry[lang] : entry.ko;
  }

  function applyLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = "ko";
    document.documentElement.lang = HTML_LANG[lang];

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const val = t(el.getAttribute("data-i18n"), lang);
      if (val != null) el.innerHTML = val;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const val = t(el.getAttribute("data-i18n-ph"), lang);
      if (val != null) el.setAttribute("placeholder", val);
    });
    document.querySelectorAll("[data-i18n-tpl]").forEach((el) => {
      let val = t(el.getAttribute("data-i18n-tpl"), lang);
      if (val == null) return;
      Object.keys(el.dataset).forEach((name) => {
        if (name === "i18nTpl") return;
        val = val.split("{" + name + "}").join(el.dataset[name]);
      });
      el.innerHTML = val;
    });
    document.querySelectorAll("[data-i18n-src]").forEach((el) => {
      if (!el.dataset.i18nOrig) el.dataset.i18nOrig = el.textContent.trim();
      const orig = el.dataset.i18nOrig;
      const entry = Object.values(DICT).find((d) => d.ko === orig);
      el.textContent = entry ? (entry[lang] != null ? entry[lang] : entry.ko) : orig;
    });

    document.querySelectorAll(".lang-switch [data-lang]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    localStorage.setItem(STORAGE_KEY, lang);
    window.NH_LANG = lang;
    document.dispatchEvent(new CustomEvent("nh:langchange", { detail: { lang } }));
  }

  window.NH_I18N = { DICT, t, applyLang, getLang: () => window.NH_LANG || detectDefaultLang() };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".lang-switch [data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => applyLang(btn.getAttribute("data-lang")));
    });
    applyLang(detectDefaultLang());
  });
})();
