import "dayjs/locale/es"

import DayJs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import duration from "dayjs/plugin/duration"
import isBetween from "dayjs/plugin/isBetween"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import localeData from "dayjs/plugin/localeData"
import localizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import weekOfYear from "dayjs/plugin/weekOfYear"

DayJs.extend(isSameOrBefore)
DayJs.extend(isSameOrAfter)
DayJs.extend(isBetween)
DayJs.extend(utc)
DayJs.extend(timezone)
DayJs.extend(advancedFormat)
DayJs.extend(localizedFormat)
DayJs.extend(localeData)
DayJs.extend(relativeTime)
DayJs.extend(duration)
DayJs.extend(weekOfYear)

export default DayJs
