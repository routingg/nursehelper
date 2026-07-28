# calc/views.py
from django.shortcuts import render
from datetime import datetime

DF_DEFAULT_LIST = [10, 15, 20, 60]


# ==== 공통 헬퍼 ====

def _parse_hhmm(s: str):
    """'HH:MM' -> (hour, minute) 또는 None"""
    try:
        dt = datetime.strptime(s.strip(), "%H:%M")
        return dt.hour, dt.minute
    except Exception:
        return None


def _to_hours_diff(start_hm, end_hm):
    """
    start_hm=(H,M), end_hm=(H,M)
    종료가 시작과 같거나 이전이면 익일(+24h)로 계산.
    반환: (duration_hours: float, end_label: 'HH:MM', crossed: bool)
    """
    sh, sm = start_hm
    eh, em = end_hm
    start_m = sh * 60 + sm
    end_m   = eh * 60 + em
    crossed = False
    if end_m <= start_m:
        end_m += 24 * 60
        crossed = True
    minutes = end_m - start_m
    end_label = f"{str(eh).zfill(2)}:{str(em).zfill(2)}"
    return minutes / 60.0, end_label, crossed


# ---- cheat sheet 기반 IV/약물 계산 헬퍼 ----

DF_DEFAULT = 20.0  # 1방울 = 0.05mL -> 1mL = 20gtt

def _rate_from_volume_and_hours(volume_ml: float, hours: float) -> float:
    """전체 수액량, 유지시간(시간) -> mL/hr"""
    return volume_ml / hours

def _rate_from_volume_and_minutes(volume_ml: float, minutes: float) -> float:
    """용량(mL), 시간(분) -> mL/hr"""
    return volume_ml * 60.0 / minutes

def _sec_per_drop_from_rate(rate_mlh: float, df: float = DF_DEFAULT) -> float | None:
    """
    mL/hr, 드립팩터(df gtt/mL) -> 초/1방울
    cheat sheet 공식: 180 ÷ mL/hr = 초/1방울 (df=20일 때)
    """
    if rate_mlh <= 0 or df <= 0:
        return None
    return 180.0 / rate_mlh * (df / DF_DEFAULT)  # df가 20이 아닐 때도 보정

def _gtt_per_min_from_rate(rate_mlh: float, df: float = DF_DEFAULT) -> float | None:
    """mL/hr -> gtt/min"""
    if rate_mlh <= 0 or df <= 0:
        return None
    ml_per_min = rate_mlh / 60.0
    return ml_per_min * df


# ==== view 함수 ====

def home(request):
    return render(request, 'calc/home.html')

# calc/views.py
def ivtime_view(request):
    return render(request, "calc/ivtime.html")


from django.shortcuts import render
from datetime import datetime

DF_DEFAULT = 20.0   # 매크로세트 기본 드립 팩터


# ==== 공통 헬퍼 ====

def _parse_hhmm(s: str):
    """'HH:MM' -> (hour, minute) 또는 None"""
    try:
        dt = datetime.strptime(s.strip(), "%H:%M")
        return dt.hour, dt.minute
    except Exception:
        return None


def _to_hours_diff(start_hm, end_hm):
    """
    start_hm=(H,M), end_hm=(H,M)
    종료가 시작과 같거나 이전이면 익일(+24h).
    반환: (duration_hours, end_label, crossed)
    """
    sh, sm = start_hm
    eh, em = end_hm
    start_m = sh * 60 + sm
    end_m   = eh * 60 + em
    crossed = False
    if end_m <= start_m:
        end_m += 24 * 60
        crossed = True
    minutes = end_m - start_m
    end_label = f"{str(eh).zfill(2)}:{str(em).zfill(2)}"
    return minutes / 60.0, end_label, crossed


# ==== view ====


def home(request):
    return render(request, 'calc/home.html')


def infusion_view(request):
    """
    단순화된 수액 계산:
    - 시작/종료 시간(HH:MM)
    - 총 용량(mL)
    -> mL/h, gtt/min, 1초당 방울수, 1방울 당 초 자동 계산
    """
    errors = []
    inputs = {}
    result = None

    defaults = {"volume_ml": 500}

    if request.method == "POST":
        inputs["start"] = (request.POST.get("start") or "").strip()
        inputs["end"]   = (request.POST.get("end") or "").strip()
        inputs["volume_ml"] = (request.POST.get("volume_ml") or "").strip()

        # 입력 검증
        if not inputs["start"]:
            errors.append("시작 시간(HH:MM)을 입력하세요.")
        if not inputs["end"]:
            errors.append("종료 시간(HH:MM)을 입력하세요.")
        if not inputs["volume_ml"]:
            errors.append("수액 총 용량(mL)을 입력하세요.")

        start_hm = _parse_hhmm(inputs["start"]) if inputs["start"] else None
        end_hm   = _parse_hhmm(inputs["end"]) if inputs["end"] else None
        if start_hm is None:
            errors.append("시작 시간 형식이 올바르지 않습니다. (예: 07:00)")
        if end_hm is None:
            errors.append("종료 시간 형식이 올바르지 않습니다. (예: 15:00)")

        # 총 용량
        volume_ml = None
        try:
            volume_ml = float(inputs["volume_ml"])
            if volume_ml <= 0:
                errors.append("총 용량(mL)은 0보다 커야 합니다.")
        except Exception:
            errors.append("총 용량(mL)을 숫자로 입력하세요.")

        # 계산
        if not errors and start_hm and end_hm:
            duration_hours, end_label, crossed = _to_hours_diff(start_hm, end_hm)
            if duration_hours <= 0:
                errors.append("종료가 시작과 같거나 이전입니다.")
            else:
                rate_mlh = volume_ml / duration_hours
                ml_per_min = rate_mlh / 60.0

                # DF = 20 자동
                df = DF_DEFAULT
                gtt_per_min = ml_per_min * df
                drops_per_sec = gtt_per_min / 60.0
                sec_per_drop = 60.0 / gtt_per_min if gtt_per_min > 0 else None

                result = {
                    "duration_hours": duration_hours,
                    "rate_mlh": rate_mlh,
                    "end_time_adjusted": f"{end_label}{' (+24h)' if crossed else ''}",

                    "gtt_per_min": gtt_per_min,
                    "drops_per_sec": drops_per_sec,
                    "sec_per_drop": sec_per_drop,
                }

    context = {
        "inputs": inputs,
        "errors": errors,
        "result": result,
        "defaults": defaults,
    }
    return render(request, "calc/infusion.html", context)





def drug_view(request):
    errors = []
    result = {}

    if request.method == "POST":
        mode = request.POST.get("mode")

        # 1) 농도 계산 (mg/mL)
        if mode == "calc_concentration":
            mg = request.POST.get("total_mg")
            ml = request.POST.get("total_ml")
            try:
                mg = float(mg)
                ml = float(ml)
                if mg <= 0 or ml <= 0:
                    raise ValueError
                conc = mg / ml
                result["concentration"] = conc
            except:
                errors.append("총 용량(mg)과 총 부피(mL)를 올바르게 입력하세요.")

        # 2) 필요한 용량(mL) 계산
        elif mode == "calc_required_ml":
            desired_mg = request.POST.get("desired_mg")
            conc = request.POST.get("conc")
            try:
                desired_mg = float(desired_mg)
                conc = float(conc)
                if desired_mg <= 0 or conc <= 0:
                    raise ValueError
                needed_ml = desired_mg / conc
                result["needed_ml"] = needed_ml
            except:
                errors.append("원하는 용량(mg)과 농도(mg/mL)를 올바르게 입력하세요.")

        # 3) 속도(mL/hr) 계산
        elif mode == "calc_rate":
            desired_mg = request.POST.get("rate_desired_mg")
            conc = request.POST.get("rate_conc")
            hours = request.POST.get("rate_hours")
            try:
                desired_mg = float(desired_mg)
                conc = float(conc)
                hours = float(hours)
                if desired_mg <= 0 or conc <= 0 or hours <= 0:
                    raise ValueError
                needed_ml = desired_mg / conc
                ml_per_hr = needed_ml / hours
                result["ml_per_hr"] = ml_per_hr
                result["need_ml_for_rate"] = needed_ml
            except:
                errors.append("용량·농도·시간을 올바르게 입력하세요.")

        # 4) mg/hr 계산 (역산)
        elif mode == "calc_mg_hr":
            rate_mlh = request.POST.get("rate_mlh")
            conc = request.POST.get("mg_conc")
            try:
                rate_mlh = float(rate_mlh)
                conc = float(conc)
                if rate_mlh <= 0 or conc <= 0:
                    raise ValueError
                mg_hr = rate_mlh * conc
                result["mg_hr"] = mg_hr
            except:
                errors.append("속도(mL/hr)와 농도(mg/mL)를 올바르게 입력하세요.")

    return render(request, "calc/drug.html", {
        "errors": errors,
        "result": result
    })



def formulas_view(request):
    """
    책에 있는 치트키(용량-시간-속도, mL/hr-초/1방울)를
    그대로 옮겨온 '공식 모음 + 퀵 계산기' 페이지.
    """
    errors = []
    calc_by_time = None   # 전체 수액량 + 유지시간 -> mL/hr
    calc_by_rate = None   # mL/hr (+ DF) -> gtt/min, 초/1방울

    if request.method == "POST":
        mode = request.POST.get("mode")

        # 1) 시간으로 처방: 전체 수액량 ÷ 유지시간 = mL/hr
        if mode == "vt_to_rate":
            vol_str = (request.POST.get("vt_volume") or "").strip()
            hrs_str = (request.POST.get("vt_hours") or "").strip()

            try:
                volume_ml = float(vol_str)
                hours = float(hrs_str)
                if volume_ml <= 0 or hours <= 0:
                    raise ValueError
            except Exception:
                errors.append("전체 수액량(mL)과 유지시간(시간)을 올바른 숫자로 입력하세요.")
            else:
                rate = _rate_from_volume_and_hours(volume_ml, hours)
                calc_by_time = {
                    "volume_ml": volume_ml,
                    "hours": hours,
                    "rate_mlh": rate,
                }

        # 2) mL/hr -> gtt/min, 초/1방울
        elif mode == "rate_to_drop":
            rate_str = (request.POST.get("rate_mlh") or "").strip()
            df_str   = (request.POST.get("df") or "").strip() or str(int(DF_DEFAULT))

            try:
                rate_mlh = float(rate_str)
                df_val = float(df_str)
                if rate_mlh <= 0 or df_val <= 0:
                    raise ValueError
            except Exception:
                errors.append("속도(mL/hr)와 드립 팩터(gtt/mL)를 올바른 숫자로 입력하세요.")
            else:
                sec_per_drop = _sec_per_drop_from_rate(rate_mlh, df_val)
                gtt_per_min  = _gtt_per_min_from_rate(rate_mlh, df_val)
                calc_by_rate = {
                    "rate_mlh": rate_mlh,
                    "df": df_val,
                    "sec_per_drop": sec_per_drop,
                    "gtt_per_min": gtt_per_min,
                }

    # 책에 있는 표를 그대로 코드로 표현 (df=20 기준)
    vt_presets = []
    for volume, minutes in [
        (50, 15),
        (50, 30),
        (50, 60),
        (100, 15),
        (100, 30),
        (100, 60),
        (200, 60),
    ]:
        rate = _rate_from_volume_and_minutes(volume, minutes)
        sec_per_drop = _sec_per_drop_from_rate(rate, DF_DEFAULT)
        vt_presets.append({
            "volume": volume,
            "minutes": minutes,
            "rate_mlh": rate,
            "sec_per_drop": sec_per_drop,
            "sec_label": f"{round(sec_per_drop):d}초에 1방울" if sec_per_drop else "-",
        })

    rate_presets = []
    for rate in [20, 30, 40, 50, 60, 80, 100, 200]:
        sec_per_drop = _sec_per_drop_from_rate(rate, DF_DEFAULT)
        rate_presets.append({
            "rate_mlh": rate,
            "sec_per_drop": sec_per_drop,
            "sec_label": f"{round(sec_per_drop):d}초에 1방울" if sec_per_drop else "-",
        })

    context = {
        "errors": errors,
        "df_default": int(DF_DEFAULT),
        "calc_by_time": calc_by_time,
        "calc_by_rate": calc_by_rate,
        "vt_presets": vt_presets,
        "rate_presets": rate_presets,
    }
    return render(request, 'calc/formulas.html', context)
