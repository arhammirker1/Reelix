"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ArrowRight, ChevronLeft } from "lucide-react"

interface OrderState {
  package: {
    name: string
    price: string
    priceValue: number
    includesScriptwriting: boolean
  } | null
  hasScript: boolean | null
  scriptAddOn: {
    name: string
    price: number
    complexity: string
  } | null
  needsPitchDeck: boolean | null
  pitchDeckPackage: {
    name: string
    price: number
    slides: number
  } | null
}

const PRICE_VALUES = {
  startup: { inr: 25000, usd: 299 },
  pro: { inr: 55000, usd: 699 },
  premium: { inr: 170500, usd: 2049 },
}

const PRICES = {
  startup: { inr: "₹25,000/-", usd: "$299" },
  pro: { inr: "₹55,000/-", usd: "$699" },
  premium: { inr: "₹1,70,500/-", usd: "$2,049" },
}

type Currency = "INR" | "USD"

function guessLocalCurrency(): Currency {
  const lang = typeof navigator !== "undefined" ? navigator.language : ""
  const tz = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : ""
  if (/-(IN|PK|BD)\b/i.test(lang) || /(Kolkata|Karachi|Dhaka)/i.test(tz || "")) return "INR"
  return "USD"
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [isInitialized, setIsInitialized] = useState(false)
  const [totalSteps, setTotalSteps] = useState(4)
  const [currency, setCurrency] = useState<Currency>("USD")
  const [order, setOrder] = useState<OrderState>({
    package: null,
    hasScript: null,
    scriptAddOn: null,
    needsPitchDeck: null,
    pitchDeckPackage: null,
  })

  // Add state for order configuration
  const [orderConfig, setOrderConfig] = useState({
    whatsappNumber: "+918384092211",
    scriptOptions: {
      simple: { price_usd: 150, price_inr: 12000, description: "Basic script up to 60s" },
      medium: { price_usd: 250, price_inr: 20000, description: "Professional script with revisions" },
      complex: { price_usd: 400, price_inr: 32000, description: "Advanced script + storyboard" },
    },
    pitchDeckOptions: {
      basic: { price_usd: 300, price_inr: 25000, slides: 10 },
      standard: { price_usd: 500, price_inr: 40000, slides: 15 },
      premium: { price_usd: 800, price_inr: 65000, slides: 20 },
    },
  })

  // Load configuration
  useEffect(() => {
    const savedContent = localStorage.getItem("skitbit-content")
    if (savedContent) {
      const content = JSON.parse(savedContent)
      if (content.orderForm) {
        setOrderConfig(content.orderForm)
      }
    }
  }, [])

  // Load currency from geo API
  useEffect(() => {
    let cancelled = false
    async function loadCurrency() {
      try {
        const res = await fetch("/api/geo", { cache: "no-store" })
        if (!res.ok) throw new Error("geo failed")
        const data = await res.json()
        if (!cancelled) setCurrency(data?.currency === "INR" ? "INR" : "USD")
      } catch {
        if (!cancelled) setCurrency(guessLocalCurrency())
      }
    }
    loadCurrency()
    return () => {
      cancelled = true
    }
  }, [])

  // Initialize order from URL params only once
  useEffect(() => {
    if (isInitialized || currency === null) return

    const plan = searchParams.get("plan")
    if (plan && ["startup", "pro", "premium"].includes(plan.toLowerCase())) {
      const planKey = plan.toLowerCase() as keyof typeof PRICES
      const planName = plan.charAt(0).toUpperCase() + plan.slice(1).toLowerCase()

      const packageData = {
        name: planName,
        price: currency === "INR" ? PRICES[planKey].inr : PRICES[planKey].usd,
        priceValue: currency === "INR" ? PRICE_VALUES[planKey].inr : PRICE_VALUES[planKey].usd,
        includesScriptwriting: planKey === "premium" || planKey === "pro", // Pro and Premium include scriptwriting
      }

      setOrder({
        package: packageData,
        hasScript: null,
        scriptAddOn: null,
        needsPitchDeck: null,
        pitchDeckPackage: null,
      })

      // Calculate total steps based on package
      if (packageData.includesScriptwriting) {
        setTotalSteps(3) // Skip script question and selection for Pro and Premium
      } else {
        setTotalSteps(4) // Startup plan goes through all steps
      }

      setIsInitialized(true)
    } else {
      router.push("/")
    }
  }, [searchParams, router, isInitialized, currency])

  const calculateTotal = () => {
    let total = order.package?.priceValue || 0
    if (order.scriptAddOn) total += order.scriptAddOn.price
    if (order.pitchDeckPackage) total += order.pitchDeckPackage.price
    return total
  }

  const formatPrice = (price: number) => {
    if (currency === "INR") {
      return `₹${price.toLocaleString()}`
    } else {
      return `$${price.toLocaleString()}`
    }
  }

  const handleNext = () => {
    if (currentStep === 1) {
      // For Pro/Premium (includes scriptwriting), go straight to pitch deck
      if (order.package?.includesScriptwriting) {
        setCurrentStep(2) // Go to pitch deck question
      } else {
        // For Startup plan, check if user has script
        if (order.hasScript === false) {
          setCurrentStep(2) // Go to script selection
        } else if (order.hasScript === true) {
          setCurrentStep(3) // Skip script, go to pitch deck question
        }
      }
    } else if (currentStep === 2) {
      if (order.package?.includesScriptwriting) {
        setCurrentStep(3) // Summary for Pro/Premium
      } else {
        setCurrentStep(3) // Go to pitch deck question for Startup
      }
    } else if (currentStep === 3) {
      setCurrentStep(4) // Summary
    }
  }

  const handleBack = () => {
    if (currentStep === 1) {
      router.push("/")
      return
    }

    if (currentStep === 2) {
      setCurrentStep(1) // Always go back to step 1
    } else if (currentStep === 3) {
      // If we're on pitch deck/summary step for plans with included scriptwriting, go back to step 1
      if (order.package?.includesScriptwriting) {
        setCurrentStep(1)
      } else {
        // For Startup plan, check if we came from script selection
        if (order.hasScript === false) {
          setCurrentStep(2) // Go back to script selection
        } else {
          setCurrentStep(1) // Go back to script question
        }
      }
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  const generateWhatsAppMessage = () => {
    let message = `Hi! I'd like to order from Reelix:\n\n`
    message += `🎬 Package: ${order.package?.name} Plan - ${order.package?.price}\n`

    if (order.scriptAddOn) {
      const scriptPrice = formatPrice(order.scriptAddOn.price)
      message += `📝 Scriptwriting: ${order.scriptAddOn.name} - ${scriptPrice}\n`
    }

    if (order.pitchDeckPackage) {
      const deckPrice = formatPrice(order.pitchDeckPackage.price)
      message += `📊 Pitch Deck: ${order.pitchDeckPackage.name} (${order.pitchDeckPackage.slides} slides) - ${deckPrice}\n`
    }

    message += `\n💰 Total Investment: ${formatPrice(calculateTotal())}\n\n`
    message += `Currency: ${currency}\n` // Debug line to verify currency
    message += `Please confirm the details and share the next steps to get started!`

    return encodeURIComponent(message)
  }

  const previewWhatsAppMessage = () => {
    const message = generateWhatsAppMessage()
    const decodedMessage = decodeURIComponent(message)
    alert(`WhatsApp Message Preview:\n\n${decodedMessage}`)
  }

  // Update WhatsApp URL generation
  const handleConfirmOrder = () => {
    const whatsappMessage = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/${orderConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`
    window.open(whatsappUrl, "_blank")
    router.push("/")
  }

  const updateOrder = (updates: Partial<OrderState>) => {
    setOrder((prev) => ({ ...prev, ...updates }))
  }

  const getProgressPercentage = () => {
    return (currentStep / totalSteps) * 100
  }

  const getStepContent = () => {
    // Step 1: Script Question (only for Startup plan)
    if (currentStep === 1 && !order.package?.includesScriptwriting) {
      return {
        title: "Do you have a video script?",
        subtitle: "We need to know if you already have a script or if we should write one for you.",
        options: [
          {
            id: "yes",
            title: "Yes, I have one",
            emoji: "✅",
            action: () => {
              updateOrder({ hasScript: true })
              setTimeout(handleNext, 300)
            },
          },
          {
            id: "no",
            title: "No, write one for me",
            emoji: "📝",
            action: () => {
              updateOrder({ hasScript: false })
              setTimeout(handleNext, 300)
            },
          },
        ],
      }
    }

    // Step 2: Scriptwriting Selection (only for Startup plan if user doesn't have script)
    if (currentStep === 2 && !order.package?.includesScriptwriting && !order.hasScript) {
      return {
        title: "Choose scriptwriting service",
        subtitle: "Select the script package that matches your needs.",
        options: [
          {
            name: "Starter Script",
            price_inr: orderConfig.scriptOptions.simple.price_inr,
            price_usd: orderConfig.scriptOptions.simple.price_usd,
            complexity: orderConfig.scriptOptions.simple.description,
            emoji: "📝",
          },
          {
            name: "Professional Script",
            price_inr: orderConfig.scriptOptions.medium.price_inr,
            price_usd: orderConfig.scriptOptions.medium.price_usd,
            complexity: orderConfig.scriptOptions.medium.description,
            emoji: "✍️",
          },
          {
            name: "Premium Script + Storyboard",
            price_inr: orderConfig.scriptOptions.complex.price_inr,
            price_usd: orderConfig.scriptOptions.complex.price_usd,
            complexity: orderConfig.scriptOptions.complex.description,
            emoji: "🎬",
          },
        ].map((option) => {
          const price = currency === "INR" ? option.price_inr : option.price_usd
          const priceDisplay = currency === "INR" ? `+₹${price.toLocaleString()}` : `+$${price}`

          return {
            id: option.name,
            title: option.name,
            subtitle: option.complexity,
            price: priceDisplay,
            emoji: option.emoji,
            action: () => {
              updateOrder({
                scriptAddOn: {
                  name: option.name,
                  price: price,
                  complexity: option.complexity,
                },
              })
              setTimeout(handleNext, 300)
            },
          }
        }),
      }
    }

    // Step 1 for Pro/Premium OR Step 2/3 for Startup: Pitch Deck Question
    const isPitchDeckStep =
      (currentStep === 1 && order.package?.includesScriptwriting) || // Pro/Premium first step
      (currentStep === 2 && order.package?.includesScriptwriting) || // This shouldn't happen but safety
      (currentStep === 3 && !order.package?.includesScriptwriting) // Startup plan after script

    if (isPitchDeckStep) {
      return {
        title: "Need an investor pitch deck?",
        subtitle: "Perfect complement to your explainer video for fundraising.",
        options: [
          {
            id: "yes",
            title: "Yes, add pitch deck",
            emoji: "📊",
            action: () => {
              updateOrder({ needsPitchDeck: true })
              setTimeout(handleNext, 300)
            },
          },
          {
            id: "no",
            title: "No, video only",
            emoji: "🎬",
            action: () => {
              updateOrder({ needsPitchDeck: false, pitchDeckPackage: null })
              setTimeout(handleNext, 300)
            },
          },
        ],
      }
    }

    // Pitch Deck Package Selection
    if (order.needsPitchDeck && !order.pitchDeckPackage) {
      return {
        title: "Choose pitch deck package",
        subtitle: "Select the deck that matches your funding goals.",
        options: [
          {
            name: "Basic Deck",
            slides: orderConfig.pitchDeckOptions.basic.slides,
            price_inr: orderConfig.pitchDeckOptions.basic.price_inr,
            price_usd: orderConfig.pitchDeckOptions.basic.price_usd,
            emoji: "📊",
          },
          {
            name: "Standard Deck",
            slides: orderConfig.pitchDeckOptions.standard.slides,
            price_inr: orderConfig.pitchDeckOptions.standard.price_inr,
            price_usd: orderConfig.pitchDeckOptions.standard.price_usd,
            emoji: "📈",
          },
          {
            name: "VC-Ready Deck",
            slides: orderConfig.pitchDeckOptions.premium.slides,
            price_inr: orderConfig.pitchDeckOptions.premium.price_inr,
            price_usd: orderConfig.pitchDeckOptions.premium.price_usd,
            emoji: "🚀",
          },
        ].map((option) => {
          const price = currency === "INR" ? option.price_inr : option.price_usd
          const priceDisplay = currency === "INR" ? `+₹${price.toLocaleString()}` : `+$${price}`

          return {
            id: option.name,
            title: option.name,
            subtitle: `${option.slides} professional slides`,
            price: priceDisplay,
            emoji: option.emoji,
            action: () => {
              updateOrder({
                pitchDeckPackage: {
                  name: option.name,
                  price: price,
                  slides: option.slides,
                },
              })
              setTimeout(handleNext, 300)
            },
          }
        }),
      }
    }

    // Summary
    return {
      title: "Order summary",
      subtitle: "Review your package before we get started.",
      isSummary: true,
    }
  }

  // Show loading state until initialized
  if (!isInitialized || !order.package) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#C6FF3A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const stepContent = getStepContent()

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Cleaner Inline Header */}
      <div className="sticky top-0 z-50 liquid-glass-header border-b border-neutral-900">
        <div className="px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="p-2 hover:bg-neutral-800 rounded-full -ml-2 sm:p-2.5"
            >
              {currentStep === 1 ? (
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
            {/* Inline Plan Name and Price */}
            <div className="flex items-center justify-between flex-1 mx-3 sm:mx-4">
              <div className="text-base font-semibold text-white sm:text-lg">{order.package.name} Plan</div>
              <div className="text-base font-bold text-[#C6FF3A] sm:text-lg">{formatPrice(calculateTotal())}</div>
            </div>
            <div className="w-8 sm:w-10" /> {/* Spacer for balance */}
          </div>

          {/* Refined Progress Bar */}
          <div className="h-0.5 bg-neutral-800 rounded-full overflow-hidden sm:h-1">
            <div
              className="h-full bg-[#C6FF3A] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content with Responsive Spacing */}
      <div className="px-4 py-8 pb-32 sm:px-6 sm:py-12 sm:pb-40">
        <div className="max-w-sm mx-auto sm:max-w-md">
          {stepContent.isSummary ? (
            // Summary View
            <div className="space-y-8 sm:space-y-10">
              <div className="text-center space-y-3 sm:space-y-4">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">{stepContent.title}</h2>
                <p className="text-neutral-400 text-base leading-relaxed sm:text-lg">{stepContent.subtitle}</p>
              </div>

              <Card className="border-neutral-800 liquid-glass rounded-xl sm:rounded-2xl">
                <CardContent className="p-5 space-y-4 sm:p-8 sm:space-y-6">
                  <div className="flex justify-between items-center py-3 border-b border-neutral-800 sm:py-4">
                    <div>
                      <h4 className="font-semibold text-white text-base sm:text-lg">{order.package.name} Plan</h4>
                      <p className="text-neutral-400 text-sm mt-0.5 sm:mt-1">SaaS Explainer Video</p>
                    </div>
                    <span className="font-bold text-white text-base sm:text-lg">{order.package.price}</span>
                  </div>

                  {order.scriptAddOn && (
                    <div className="flex justify-between items-center py-3 border-b border-neutral-800 sm:py-4">
                      <div>
                        <h4 className="font-semibold text-white text-sm sm:text-base">
                          Scriptwriting - {order.scriptAddOn.name}
                        </h4>
                        <p className="text-neutral-400 text-xs mt-0.5 sm:text-sm sm:mt-1">
                          {order.scriptAddOn.complexity}
                        </p>
                      </div>
                      <span className="font-bold text-white text-sm sm:text-base">
                        +{formatPrice(order.scriptAddOn.price)}
                      </span>
                    </div>
                  )}

                  {order.pitchDeckPackage && (
                    <div className="flex justify-between items-center py-3 border-b border-neutral-800 sm:py-4">
                      <div>
                        <h4 className="font-semibold text-white text-sm sm:text-base">{order.pitchDeckPackage.name}</h4>
                        <p className="text-neutral-400 text-xs mt-0.5 sm:text-sm sm:mt-1">
                          {order.pitchDeckPackage.slides} investor-ready slides
                        </p>
                      </div>
                      <span className="font-bold text-white text-sm sm:text-base">
                        +{formatPrice(order.pitchDeckPackage.price)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-4 bg-[#C6FF3A]/10 rounded-xl px-4 mt-4 sm:py-6 sm:rounded-2xl sm:px-6 sm:mt-6">
                    <h4 className="text-lg font-bold text-white sm:text-xl">Total Investment</h4>
                    <span className="text-2xl font-bold text-[#C6FF3A] sm:text-3xl">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Question View with Better Mobile UX
            <div className="space-y-8 sm:space-y-12">
              <div className="text-center space-y-4 sm:space-y-6">
                <h2 className="text-2xl font-bold text-white leading-tight sm:text-3xl">{stepContent.title}</h2>
                <p className="text-neutral-400 text-base leading-relaxed max-w-xs mx-auto sm:text-xl sm:max-w-sm">
                  {stepContent.subtitle}
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {stepContent.options?.map((option) => (
                  <Button
                    key={option.id}
                    onClick={option.action}
                    variant="outline"
                    className="w-full h-auto p-4 text-left liquid-glass hover:liquid-glass-enhanced transition-all duration-200 group rounded-2xl sm:p-6 bg-transparent"
                  >
                    <div className="flex items-center gap-4 w-full sm:gap-5">
                      <div className="text-2xl flex-shrink-0 sm:text-3xl">{option.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-white text-base group-hover:text-[#C6FF3A] transition-colors sm:text-lg">
                            {option.title}
                          </div>
                          {option.price && (
                            <div className="text-[#C6FF3A] font-bold text-sm sm:text-base">{option.price}</div>
                          )}
                        </div>
                        {option.subtitle && (
                          <div className="text-neutral-400 text-sm mt-1 sm:text-base">{option.subtitle}</div>
                        )}
                      </div>
                      <ArrowRight className="h-5 w-5 text-neutral-600 group-hover:text-[#C6FF3A] transition-colors flex-shrink-0 sm:h-6 sm:w-6 sm:ml-3" />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Optimized Bottom CTA */}
      {stepContent.isSummary && (
        <div className="fixed bottom-0 left-0 right-0 liquid-glass-header border-t border-neutral-800 p-4 sm:p-8">
          <div className="max-w-sm mx-auto sm:max-w-md space-y-3">
            {/* Preview button for testing */}
            <Button
              onClick={previewWhatsAppMessage}
              variant="outline"
              className="w-full h-10 text-sm border-neutral-700 text-neutral-300 hover:bg-neutral-800 bg-transparent"
            >
              Preview Message
            </Button>

            <Button
              onClick={handleConfirmOrder}
              className="w-full h-12 text-base font-semibold bg-[#C6FF3A] text-black hover:bg-[#C6FF3A]/90 rounded-xl shadow-lg shadow-[#C6FF3A]/20 sm:h-16 sm:text-xl sm:rounded-2xl"
            >
              Send Order via WhatsApp
              <ArrowRight className="h-4 w-4 ml-2 sm:h-6 sm:w-6 sm:ml-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}