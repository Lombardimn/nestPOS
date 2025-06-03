"use client"

import { Button } from "@/components/ui/Button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { formatDate, parseDate } from "@/utils"
import { CalendarDotsIcon, CaretLeftIcon, CaretRightIcon, EyeIcon, MouseLeftClickIcon } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

interface Reservation {
  id: string
  checkIn: string
  checkOut: string
  guestName: string
  roomType: string
  status: string
  hotelName: string
  totalAmount: number
}

interface ReservationCalendarViewProps {
  reservations: Reservation[]
  onViewDetails: (reservation: Reservation) => void
}

export default function FilterForm({ reservations = [], onViewDetails = () => {} }: ReservationCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [calendarDays, setCalendarDays] = useState<Date[]>([])
  const [viewType, setViewType] = useState<"month" | "week">("month")
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false)
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear())
  const [hoveredDay, setHoveredDay] = useState<number | null>(null)
  const [showYearSelector, setShowYearSelector] = useState<boolean>(false)
  const [yearRange, setYearRange] = useState<number[]>([])
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth())

  /** Generar rango de años */
  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i)
    }
    setYearRange(years)
  }, [])

  // Get status color class
  const getStatusColorClass = (status: string): string => {
    switch (status) {
      case "Confirmada":
        return "bg-green-100 border-l-green-500 text-green-800"
      case "Pendiente":
        return "bg-yellow-100 border-l-yellow-500 text-yellow-800"
      case "Cancelada":
        return "bg-red-100 border-l-red-500 text-red-800"
      default:
        return "bg-gray-100 border-l-gray-500 text-gray-800"
    }
  }

  /** Generar un calendario según la vista */
  useEffect(() => {
    const days: Date[] = []
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)

    if (viewType === "month") {
      /** Obtener el primer día del mes */
      const firstDayOfWeek = firstDay.getDay() // 0 = Sunday, 1 = Monday, etc.

      /** Obtener los días del mes anterior iniciando en el domingo */
      const daysFromPrevMonth = firstDayOfWeek === 0 ? 0 : firstDayOfWeek

      for (let i = daysFromPrevMonth; i > 0; i--) {
        const prevDate = new Date(firstDay)
        prevDate.setDate(prevDate.getDate() - i)
        days.push(prevDate)
      }

      /** Añadir todos los dias del mes actual */
      const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
      const daysInMonth = lastDay.getDate()

      for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i))
      }

      /** Añadir los dias del mes siguiente para completar la grilla (6 filas x 7 columnas = 42 celdas) */
      const remainingDays = 42 - days.length
      for (let i = 1; i <= remainingDays; i++) {
        const nextDate = new Date(lastDay)
        nextDate.setDate(nextDate.getDate() + i)
        days.push(nextDate)
      }
    } else {
      /** Vista de semana - mostrar 7 días a partir de la fecha actual */
      const startOfWeek = new Date(currentDate)
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()) // Start from Sunday

      for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek)
        day.setDate(startOfWeek.getDate() + i)
        days.push(day)
      }
    }

    setCalendarDays(days)
  }, [currentDate, viewType])

  /** Navegar al mes/semana anterior */
  const goToPrevious = () => {
    const newDate = new Date(currentDate)
    if (viewType === "month") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setDate(newDate.getDate() - 7)
    }
    setCurrentDate(newDate)
    setSelectedMonth(newDate.getMonth())
    setSelectedYear(newDate.getFullYear())
  }

  /** Navegar al mes/semana siguiente */
  const goToNext = () => {
    const newDate = new Date(currentDate)
    if (viewType === "month") {
      newDate.setMonth(newDate.getMonth() + 1)
    } else {
      newDate.setDate(newDate.getDate() + 7)
    }
    setCurrentDate(newDate)
    setSelectedMonth(newDate.getMonth())
    setSelectedYear(newDate.getFullYear())
  }

  // Get reservations for a specific day
  const getReservationsForDay = (day: Date): Reservation[] => {
    const formattedDay = formatDate(day)
    return reservations.filter((reservation) => {
      const checkInDate = parseDate(reservation.checkIn)
      const checkOutDate = parseDate(reservation.checkOut)

      // Check if the day is between check-in and check-out dates (inclusive)
      const currentDay = parseDate(formattedDay)
      return currentDay >= checkInDate && currentDay <= checkOutDate
    })
  }

  /** Formatear el nombre del mes */
  const getMonthName = (date: Date): string => {
    return date.toLocaleString("es-ES", { month: "long", year: "numeric" })
  }

  /** Obtener el nombre del mes sin el año */
  const getMonthNameOnly = (monthIndex: number): string => {
    const date = new Date()
    date.setMonth(monthIndex)
    return date.toLocaleString("es-ES", { month: "long" })
  }

  /** Seleccionar una fecha */
  const handleDateSelection = () => {
    const newDate = new Date(selectedYear, selectedMonth, 1)
    setCurrentDate(newDate)
    setIsDatePickerOpen(false)
  }

  /** Ir a la fecha actual */
  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedMonth(today.getMonth())
    setSelectedYear(today.getFullYear())
  }

  /** Alternar entre vista de mes y año */
  const toggleYearSelector = () => {
    setShowYearSelector(!showYearSelector)
  }

  /** Formatear la selección actual según la vista */
  const formatCurrentSelection = () => {
    if (viewType === "month") {
      return getMonthName(currentDate)
    } else {
      return `Semana del ${formatDate(calendarDays[0])} al ${formatDate(calendarDays[6])}`
    }
  }

  return (
    <div className="mb-3 shadow-md">
      <div className="px-2">
        {/** Barra de navegación */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <div className="flex items-center gap-2">
            {/** Mes/Semana Anterior */}
            <Button 
              method={goToPrevious}
              icons={<CaretLeftIcon size={32} className="text-white"/>}
              className="h-8 w-8"
            />

            {/** Año/Mes */}
            <Button
              variant="outline"
              className="font-semibold text-lg hover:bg-gray-700 hover:text-white flex items-center justify-center gap-1"
              method={() => setIsDatePickerOpen(true)}
            >
              <p className="capitalize">{formatCurrentSelection()}</p>
              <CalendarDotsIcon className="h-4 w-4 ml-1" />
            </Button>

            {/** Mes/Semana Siguiente */}
            <Button 
              method={goToNext}
              icons={<CaretRightIcon size={32} weight="bold" className="text-white"/>}
              className="h-8 w-8"
            />

            <Button
              variant="outline" 
              size="sm"
              method={goToToday}
              className="ml-2 h-10 w-10">
              Hoy
            </Button>
          </div>

          <div className="flex gap-4">
            <Button
              variant={viewType === "month" ? "default" : "outline"}
              method={() => setViewType("month")}
              className={viewType === "month" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              Mes
            </Button>
            <Button
              variant={viewType === "week" ? "default" : "outline"}
              method={() => setViewType("week")}
              className={viewType === "week" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              Semana
            </Button>
          </div>
        </div>

        {/* Encabezado del calendario - Días de la semana */}
        <div className="grid grid-cols-7">
          {
            ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day, index) => (
              <div 
                key={index}
                className="text-center py-2 text-sm font-bold text-gray-950 border-b-2 border-gray-300"
              >
                {day}
              </div>
            ))
          }
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {
            calendarDays.map((day, index) => {
              const isCurrentMonth = day.getMonth() === currentDate.getMonth()
              const isToday = formatDate(day) === formatDate(new Date())
              const dayReservations = getReservationsForDay(day)
              const isHovered = hoveredDay === index

              return (
                <div
                  key={index}
                  className={
                    `min-h-[120px] relative p-1 border-b border-gray-400 
                    ${index % 7 !== 6 ? "border-r" : ""}
                    ${isCurrentMonth ? "bg-gray-100" : "bg-gray-300"} 
                    ${isHovered ? "bg-green-50" : ""}`
                  }
                  onMouseEnter={() => setHoveredDay(index)}
                  onMouseLeave={() => setHoveredDay(null)}
                >
                  <div className={`text-right p-1 ${!isCurrentMonth ? "text-gray-800" : ""}`}>
                    <span
                      className={
                        `inline-block rounded-full w-7 h-7 text-center leading-7 
                        ${ isToday 
                          ? "bg-green-500 text-white font-medium"
                          : isCurrentMonth 
                            ? "hover:bg-gray-200"
                            : ""
                        }`
                      }
                    >
                      {day.getDate()}
                    </span>
                  </div>

                  <div className="space-y-1 overflow-y-auto max-h-[90px] pr-1">
                    {
                      dayReservations.map((reservation) => {
                        const isCheckIn = formatDate(day) === reservation.checkIn
                        const isCheckOut = formatDate(day) === reservation.checkOut
                        const isMultiDay = reservation.checkIn !== reservation.checkOut

                        // Determine if this is the first, middle, or last day of a multi-day reservation
                        let positionClass = ""
                        if (isMultiDay) {
                          if (isCheckIn) positionClass = "rounded-l-md ml-0"
                          else if (isCheckOut) positionClass = "rounded-r-md"
                          else positionClass = "rounded-none"
                        } else {
                          positionClass = "rounded-md"
                        }

                        return (
                          <div
                            key={reservation.id}
                            className={`text-xs p-1.5 border-l-4 flex justify-between items-center cursor-pointer hover:shadow-md transition-shadow ${positionClass} ${getStatusColorClass(
                              reservation.status,
                            )}`}
                            onClick={() => onViewDetails(reservation)}
                          >
                            <div className="truncate flex-1">
                              <div className="font-medium">{reservation.guestName}</div>
                              <div className="text-[10px] mt-0.5 flex items-center">
                                {isCheckIn && (
                                  <div className="mr-1 text-[9px] py-0 border-green-500 text-green-700">
                                    IN
                                  </div>
                                )}
                                {isCheckOut && (
                                  <div className="mr-1 text-[9px] py-0 border-red-500 text-red-700">
                                    OUT
                                  </div>
                                )}
                                <span className="truncate">{reservation.roomType}</span>
                              </div>
                            </div>
                            <EyeIcon className="h-3 w-3 flex-shrink-0 opacity-70" />
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>


      {/* Modal de seleccion de Año/Mes */}
      <Dialog open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 bg-gray-100">
          <DialogHeader className="p-4 border-b bg-gray-800 text-white rounded-t-lg">
            <DialogTitle className="text-xl font-bold">
              Seleccionar fecha
            </DialogTitle>
          </DialogHeader>

          <div className="p-4">
            {/* Seleccionar Año Actual */}
            <div className="text-2xl font-bold mb-6">
              {
                showYearSelector 
                  ? (
                    <span>Seleccionar año</span>
                  )
                  : (
                    <span>
                      {getMonthNameOnly(selectedMonth)} {selectedYear}
                    </span>
                  )
              }
            </div>

            {/* Alternar Mes/Año */}
            <Button
              variant="outline"
              className="w-full mb-4 flex flex-row-reverse justify-between items-center"
              method={toggleYearSelector}
              icons={<MouseLeftClickIcon className="h-4 w-4" />}
            >
              {
                showYearSelector 
                ? "Seleccionar mes" 
                : "Seleccionar año"
              }
            </Button>

            {
              showYearSelector 
                ? (
                    // Grid de selección de año 
                    <div className="h-[300px]">
                      <div className="grid grid-cols-3 gap-2">
                        {
                          yearRange.map((year) => (
                          <Button
                            key={year}
                            variant={year === selectedYear ? "default" : "outline"}
                            className={year === selectedYear ? "bg-green-600 hover:bg-green-700" : ""}
                            method={() => {
                              setSelectedYear(year)
                              setShowYearSelector(false)
                            }}
                          >
                            {year}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )
                : (
                    // Grid de selección de Mes 
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: 12 }, (_, i) => (
                        <Button
                          key={i}
                          variant={i === selectedMonth ? "default" : "outline"}
                          className={`capitalize ${i === selectedMonth ? "bg-green-600 hover:bg-green-700" : ""}`}
                          onClick={() => setSelectedMonth(i)}
                        >
                          {getMonthNameOnly(i).substring(0, 3)}
                        </Button>
                      ))}
                    </div>
                  )
            }
          </div>

          <DialogFooter className="p-4 border-t">
            <Button 
              variant="outline" 
              method={() => setIsDatePickerOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              method={handleDateSelection}
            >
              Aceptar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
