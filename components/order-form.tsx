"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, ArrowLeft, ArrowRight, Check, Package, FileText, Sparkles } from "lucide-react"
import Image from "next/image"

interface OrderFormProps {
  isOpen: boolean
  onClose: () => void
  selectedPackage: {
    name: string
    price: string
    priceValue: number
    includesScriptwriting: boolean
  } | null
}

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
    price_inr: number
    price_usd: number
    complexity: string
    emoji: string
  } | null
  needsPitchDeck: boolean | null
  pitchDeckPackage: {
    name: string
    price_inr: number
    price_usd: number
    slides: number
    emoji: string
  } | null
}

export function OrderForm({ isOpen, onClose, selectedPackage }: OrderFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [order, setOrder] = useState<OrderState>({
    package: null,
    hasScript: null,
    scriptAddOn: null,
    needsPitchDeck: null,
    pitchDeckPackage: null,
  })

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

  useEffect(() => {
    const savedContent = localStorage.getItem("skitbit-content")
    if (savedContent) {
      const content = JSON.parse(savedContent)
      if (content.orderForm) {
        setOrderConfig(content.orderForm)
      }
    }
  }, [])

  const scriptOptions = [
    {
      name: "Starter Script (up to 45s)",
      price_inr: orderConfig.scriptOptions.simple.price_inr,
      price_usd: orderConfig.scriptOptions.simple.price_usd,
      complexity: orderConfig.scriptOptions.simple.description,
      emoji: "📝",
    },
    {
      name: "Professional Script (up to 60s)",
      price_inr: orderConfig.scriptOptions.medium.price_inr,
      price_usd: orderConfig.scriptOptions.medium.price_usd,
      complexity: orderConfig.scriptOptions.medium.description,
      emoji: "✍️",
    },
    {
      name: "Premium Script + Storyboard (90s)",
      price_inr: orderConfig.scriptOptions.complex.price_inr,
      price_usd: orderConfig.scriptOptions.complex.price_usd,
      complexity: orderConfig.scriptOptions.complex.description,
      emoji: "🎬",
    },
  ]

  const pitchDeckOptions = [
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
  ]

  // Reset form when opened with new package
  useEffect(() => {
    if (isOpen && selectedPackage) {
      setOrder({
        package: selectedPackage,
        hasScript: null,
        scriptAddOn: null,
        needsPitchDeck: null,
        pitchDeckPackage: null,
      })
      setCurrentStep(1)
    }
  }, [isOpen, selectedPackage])

  const calculateTotal = () => {
    let total = order.package?.priceValue || 0
    if (order.scriptAddOn) total += order.scriptAddOn.price_inr
    if (order.pitchDeckPackage) total += order.pitchDeckPackage.price_inr
    return total
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`
  }

  const handleNext = () => {
    if (currentStep === 1) {
      // If package includes scriptwriting (Pro or Premium), skip to pitch deck upsell
      if (order.package?.includesScriptwriting) {
        setCurrentStep(3)
      } else {
        // For Startup plan, check if user has script
        if (order.hasScript) {
          setCurrentStep(3) // Skip script selection
        } else {
          setCurrentStep(2) // Go to script selection
        }
      }
    } else if (currentStep === 2) {
      setCurrentStep(3)
    } else if (currentStep === 3) {
      setCurrentStep(4)
    }
  }

  const handleBack = () => {
    if (currentStep === 3) {
      // If we skipped step 2, go back to step 1
      if (order.package?.includesScriptwriting || order.hasScript) {
        setCurrentStep(1)
      } else {
        setCurrentStep(2)
      }
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  const generateWhatsAppMessage = () => {
    let message = `Hi! I'd like to order from Reelix:\n\n`
    message += `🎬 Package: ${order.package?.name} Plan - ${order.package?.price}\n`

    if (order.scriptAddOn) {
      message += `📝 Scriptwriting: ${order.scriptAddOn.name} - ₹${order.scriptAddOn.price_inr}\n`
    }

    if (order.pitchDeckPackage) {
      message += `📊 Pitch Deck: ${order.pitchDeckPackage.name} (${order.pitchDeckPackage.slides} slides) - ₹${order.pitchDeckPackage.price_inr}\n`
    }

    message += `\n💰 Total Investment: ${formatPrice(calculateTotal())}\n\n`
    message += `Please confirm the details and share the next steps to get started!`

    return encodeURIComponent(message)
  }

  const handleConfirmOrder = () => {
    const whatsappMessage = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/${orderConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`
    window.open(whatsappUrl, "_blank")
    onClose()
  }

  const isNextDisabled = () => {
    if (currentStep === 1) {
      // For packages that don't include scriptwriting, user must answer the script question
      if (!order.package?.includesScriptwriting && order.hasScript === null) {
        return true
      }
      return false
    }
    if (currentStep === 2) {
      return !order.scriptAddOn
    }
    if (currentStep === 3) {
      if (order.needsPitchDeck === null) return true
      if (order.needsPitchDeck && !order.pitchDeckPackage) return true
      return false
    }
    return false
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f0f0f] glass-border-enhanced rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#C6FF3A]/20 rounded-lg flex items-center justify-center">
              <Package className="h-4 w-4 text-[#C6FF3A]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Customize Your Order</h2>
              <p className="text-sm text-neutral-400">Step {currentStep} of 4</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-[#C6FF3A]/20 text-[#C6FF3A] border-[#C6FF3A]/30">
              Total: {formatPrice(calculateTotal())}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-neutral-400 hover:text-white hover:bg-neutral-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-3 bg-neutral-900/50">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    step <= currentStep ? "bg-[#C6FF3A] text-black" : "bg-neutral-700 text-neutral-400"
                  }`}
                >
                  {step < currentStep ? <Check className="h-4 w-4" /> : step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-8 h-0.5 mx-2 transition-colors ${
                      step < currentStep ? "bg-[#C6FF3A]" : "bg-neutral-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Step 1: Package Confirmation */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Review Your Package</h3>
                <p className="text-neutral-400">Perfect! Let's customize your explainer video package</p>
              </div>

              <Card className="glass-border-subtle border-neutral-800 bg-neutral-900/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{order.package?.name} Plan</h4>
                      <p className="text-neutral-400">
                        {order.package?.includesScriptwriting
                          ? "Includes professional scriptwriting & voiceover"
                          : "Video production with your script"}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#C6FF3A]">{order.package?.price}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Only show script question for Startup plan */}
              {!order.package?.includesScriptwriting && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Do you already have a video script?</h4>
                  <p className="text-neutral-400">
                    If not, our team can write a high-converting script tailored to your SaaS product.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={order.hasScript === true ? "default" : "outline"}
                      onClick={() => setOrder({ ...order, hasScript: true })}
                      className={`h-16 ${
                        order.hasScript === true
                          ? "bg-[#C6FF3A] text-black hover:bg-[#C6FF3A]/90"
                          : "border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                      }`}
                    >
                      <div className="text-center">
                        <Check className="h-5 w-5 mx-auto mb-1" />
                        <div className="font-medium">Yes, I have one</div>
                      </div>
                    </Button>
                    <Button
                      variant={order.hasScript === false ? "default" : "outline"}
                      onClick={() => setOrder({ ...order, hasScript: false })}
                      className={`h-16 ${
                        order.hasScript === false
                          ? "bg-[#C6FF3A] text-black hover:bg-[#C6FF3A]/90"
                          : "border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                      }`}
                    >
                      <div className="text-center">
                        <FileText className="h-5 w-5 mx-auto mb-1" />
                        <div className="font-medium">No, write one for me</div>
                      </div>
                    </Button>
                  </div>
                </div>
              )}

              {/* For Pro/Premium plans, show what's included */}
              {order.package?.includesScriptwriting && (
                <div className="space-y-4">
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-400" />
                      <div>
                        <h4 className="text-green-300 font-semibold">
                          {order.package.name === "Pro"
                            ? "Professional Scriptwriting Included"
                            : "Premium Scriptwriting + Storyboard Included"}
                        </h4>
                        <p className="text-green-200 text-sm">
                          Our team will craft a compelling script that converts - no additional cost!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Scriptwriting Add-on */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Choose Scriptwriting Service</h3>
                <p className="text-neutral-400">Select the script package that fits your needs</p>
              </div>

              <div className="grid gap-4">
                {scriptOptions.map((option) => (
                  <Card
                    key={option.name}
                    className={`cursor-pointer transition-all hover:scale-[1.02] ${
                      order.scriptAddOn?.name === option.name
                        ? "glass-border-enhanced bg-[#C6FF3A]/10"
                        : "glass-border bg-neutral-900/50 hover:glass-border-enhanced"
                    }`}
                    onClick={() =>
                      setOrder({
                        ...order,
                        scriptAddOn: {
                          name: option.name,
                          price_inr: option.price_inr,
                          price_usd: option.price_usd,
                          complexity: option.complexity,
                          emoji: option.emoji,
                        },
                      })
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-neutral-800 rounded-lg flex items-center justify-center text-3xl">
                          {option.emoji}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-white">{option.name}</h4>
                            <span className="text-[#C6FF3A] font-semibold">+₹{option.price_inr.toLocaleString()}</span>
                          </div>
                          <p className="text-sm text-neutral-400">{option.complexity}</p>
                        </div>
                        {order.scriptAddOn?.name === option.name && <Check className="h-5 w-5 text-[#C6FF3A]" />}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Pitch Deck Upsell */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Add an Investor Pitch Deck?</h3>
                <p className="text-neutral-400">Perfect complement to your explainer video for fundraising</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Would you like a pitch deck designed?</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={order.needsPitchDeck === true ? "default" : "outline"}
                    onClick={() => setOrder({ ...order, needsPitchDeck: true })}
                    className={`h-16 ${
                      order.needsPitchDeck === true
                        ? "bg-[#C6FF3A] text-black hover:bg-[#C6FF3A]/90"
                        : "border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                    }`}
                  >
                    <div className="text-center">
                      <Sparkles className="h-5 w-5 mx-auto mb-1" />
                      <div className="font-medium">Yes, add pitch deck</div>
                    </div>
                  </Button>
                  <Button
                    variant={order.needsPitchDeck === false ? "default" : "outline"}
                    onClick={() => setOrder({ ...order, needsPitchDeck: false, pitchDeckPackage: null })}
                    className={`h-16 ${
                      order.needsPitchDeck === false
                        ? "bg-[#C6FF3A] text-black hover:bg-[#C6FF3A]/90"
                        : "border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                    }`}
                  >
                    <div className="text-center">
                      <X className="h-5 w-5 mx-auto mb-1" />
                      <div className="font-medium">No, just the video</div>
                    </div>
                  </Button>
                </div>
              </div>

              {order.needsPitchDeck && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Choose Pitch Deck Package</h4>
                  <div className="grid gap-3">
                    {pitchDeckOptions.map((option) => (
                      <Card
                        key={option.name}
                        className={`cursor-pointer transition-all hover:scale-[1.02] ${
                          order.pitchDeckPackage?.name === option.name
                            ? "glass-border-enhanced bg-[#C6FF3A]/10"
                            : "glass-border bg-neutral-900/50 hover:glass-border-enhanced"
                        }`}
                        onClick={() =>
                          setOrder({
                            ...order,
                            pitchDeckPackage: {
                              name: option.name,
                              price_inr: option.price_inr,
                              price_usd: option.price_usd,
                              slides: option.slides,
                              emoji: option.emoji,
                            },
                          })
                        }
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-semibold text-white flex items-center gap-2">
                                <span className="text-2xl">{option.emoji}</span>
                                {option.name}
                              </h5>
                              <p className="text-sm text-neutral-400">{option.slides} professionally designed slides</p>
                            </div>
                            <div className="text-right">
                              <span className="text-[#C6FF3A] font-semibold">
                                +₹{option.price_inr.toLocaleString()}
                              </span>
                              {order.pitchDeckPackage?.name === option.name && (
                                <Check className="h-4 w-4 text-[#C6FF3A] ml-2 inline" />
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Summary */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Order Summary</h3>
                <p className="text-neutral-400">Review your package before we get started</p>
              </div>

              <Card className="glass-border-subtle border-neutral-800 bg-neutral-900/50">
                <CardHeader>
                  <CardTitle className="text-white">Your Complete Package</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                    <div>
                      <h4 className="font-medium text-white">{order.package?.name} Plan</h4>
                      <p className="text-sm text-neutral-400">SaaS Explainer Video</p>
                    </div>
                    <span className="font-semibold text-white">{order.package?.price}</span>
                  </div>

                  {order.scriptAddOn && (
                    <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                      <div>
                        <h4 className="font-medium text-white">Scriptwriting - {order.scriptAddOn.name}</h4>
                        <p className="text-sm text-neutral-400">{order.scriptAddOn.complexity}</p>
                      </div>
                      <span className="font-semibold text-white">
                        +₹{order.scriptAddOn.price_inr.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {order.pitchDeckPackage && (
                    <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                      <div>
                        <h4 className="font-medium text-white">{order.pitchDeckPackage.name}</h4>
                        <p className="text-sm text-neutral-400">{order.pitchDeckPackage.slides} investor-ready slides</p>
                      </div>
                      <span className="font-semibold text-white">
                        +₹{order.pitchDeckPackage.price_inr.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-3 bg-[#C6FF3A]/10 rounded-lg px-4">
                    <h4 className="text-lg font-bold text-white">Total Investment</h4>
                    <span className="text-2xl font-bold text-[#C6FF3A]">{formatPrice(calculateTotal())}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-neutral-800">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? onClose : handleBack}
            className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {currentStep === 1 ? "Cancel" : "Back"}
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              disabled={isNextDisabled()}
              className={`${
                isNextDisabled()
                  ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                  : "bg-[#C6FF3A] text-black hover:bg-[#C6FF3A]/90"
              }`}
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleConfirmOrder} className="bg-[#C6FF3A] text-black hover:bg-[#C6FF3A]/90">
              Send Order via WhatsApp
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}