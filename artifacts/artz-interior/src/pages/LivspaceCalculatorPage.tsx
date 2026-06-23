import { useState, useEffect, useRef, FormEvent, useCallback } from "react";
import { useParams } from "wouter";
import { SiteShell } from "@/components/site/SiteShell";
import { supabase } from "@/lib/supabase";
import EmailVerificationModal from "../components/EmailVerificationModal";
import { CheckCircle2, ChevronDown, ChevronUp, Plus, Minus, Download } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

function formatPhoneToE164(phone: string): string {
  const trimmed = phone.trim();
  if (trimmed.startsWith("+")) return trimmed;
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  return `+${digits}`;
}



type CalculatorType = "full-home" | "kitchen" | "wardrobe";

interface BHKOption {
  id: string;
  label: string;
  subOptions?: { id: string; label: string; desc: string }[];
}

const bhkOptions: BHKOption[] = [
  {
    id: "1bhk",
    label: "1 BHK",
    subOptions: [
      { id: "1bhk-small", label: "Small", desc: "Standard size" },
      { id: "1bhk-large", label: "Large", desc: "Spacious size" },
    ],
  },
  {
    id: "2bhk",
    label: "2 BHK",
    subOptions: [
      { id: "2bhk-small", label: "Small", desc: "Below 800 sq ft" },
      { id: "2bhk-large", label: "Large", desc: "Above 800 sq ft" },
    ],
  },
  {
    id: "3bhk",
    label: "3 BHK",
    subOptions: [
      { id: "3bhk-small", label: "Small", desc: "Below 1200 sq ft" },
      { id: "3bhk-large", label: "Large", desc: "Above 1200 sq ft" },
    ],
  },
  {
    id: "4bhk",
    label: "4 BHK",
    subOptions: [
      { id: "4bhk-small", label: "Small", desc: "Below 1600 sq ft" },
      { id: "4bhk-large", label: "Large", desc: "Above 1600 sq ft" },
    ],
  },
  {
    id: "bungalow",
    label: "Bungalow",
  },
];

const roomsToDesign = [
  { id: "living", label: "Living Room" },
  { id: "kitchen", label: "Kitchen" },
  { id: "bedroom", label: "Bedroom" },
  { id: "bathroom", label: "Bathroom" },
  { id: "dining", label: "Dining" },
];

const packages = [
  {
    id: "essentials",
    label: "Essentials (₹)",
    desc: "A range of essential home interior solutions that's perfect for all your needs.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
    features: [
      "Affordable pricing",
      "Convenient designs",
      "Basic accessories"
    ]
  },
  {
    id: "premium",
    label: "Premium (₹₹)",
    desc: "Superior home interior solutions that will take your interiors to the next level.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
    features: [
      "Premium finishes",
      "Customized designs",
      "Branded accessories"
    ]
  },
  {
    id: "luxe",
    label: "Luxe (₹₹₹₹)",
    desc: "High-end interior solutions for the ultimate home interior experience you deserve.",
    image: "/assets/luxaryimg.jpg",
    features: [
      "Elite pricing",
      "Lavish designs",
      "Extensive range of accessories"
    ]
  }
];

export default function LivspaceCalculatorPage() {
  const params = useParams();
  const type = (params.type || "full-home") as CalculatorType;

  // Define steps based on type
  const steps = type === "full-home"
    ? ["BHK TYPE", "ROOMS TO DESIGN", "PACKAGE", "CONTACT INFO", "VERIFICATION", "ESTIMATION"]
    : type === "kitchen"
      ? ["KITCHEN LAYOUT", "PACKAGE", "CONTACT INFO", "VERIFICATION", "ESTIMATION"]
      : ["LENGTH", "TYPE", "FINISH", "ACCESSORIES", "CONTACT INFO", "VERIFICATION", "ESTIMATION"]; // wardrobe

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const recaptchaContainer = useCallback(() => {
    return (
      <div id="recaptcha-container" className="hidden"></div>
    );
  }, []);

  // Ensure a permanent reCAPTCHA container is rendered in the DOM (outside animated steps)

  // Form State
  const [bhkType, setBhkType] = useState<string>("");
  const [bhkSubSize, setBhkSubSize] = useState<string>("");
  const [expandedBhk, setExpandedBhk] = useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState<string>("");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const [roomCounts, setRoomCounts] = useState<Record<string, number>>({
    living: 1,
    kitchen: 1,
    bedroom: 2,
    bathroom: 2,
    dining: 1,
  });

  const [kitchenLayout, setKitchenLayout] = useState<string>("");

  // Wardrobe state
  const [wardrobeLength, setWardrobeLength] = useState<string>("");
  const [wardrobeType, setWardrobeType] = useState<string>("");
  const [wardrobeFinish, setWardrobeFinish] = useState<string>("");
  const [wardrobeAccessories, setWardrobeAccessories] = useState<string[]>([]);

  const [selectedPackage, setSelectedPackage] = useState<string>("");

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: true
  });



  const goToVerificationStep = useCallback(() => {
    setCurrentStepIndex((prev) => {
      const verificationIdx = steps.indexOf("VERIFICATION");
      return verificationIdx >= 0 ? verificationIdx : prev + 1;
    });
  }, [steps]);

  const goToEstimationStep = useCallback(() => {
    setCurrentStepIndex((prev) => {
      const estimationIdx = steps.indexOf("ESTIMATION");
      return estimationIdx >= 0 ? estimationIdx : prev + 1;
    });
  }, [steps]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const getMaxLimits = (type: string) => {
    if (type === "1bhk") return { bedroom: 1, bathroom: 1, kitchen: 1, living: 1, dining: 1 };
    if (type === "2bhk") return { bedroom: 2, bathroom: 2, kitchen: 1, living: 1, dining: 1 };
    if (type === "3bhk") return { bedroom: 3, bathroom: 3, kitchen: 1, living: 1, dining: 1 };
    if (type === "4bhk") return { bedroom: 4, bathroom: 4, kitchen: 1, living: 1, dining: 1 };
    if (type === "bungalow") return { bedroom: 5, bathroom: 5, kitchen: 1, living: 1, dining: 1 };
    return { bedroom: 10, bathroom: 10, kitchen: 2, living: 2, dining: 2 };
  };

  useEffect(() => {
    if (bhkType) {
      const limits = getMaxLimits(bhkType);
      setRoomCounts(prev => ({
        living: Math.min(prev.living || 1, limits.living),
        kitchen: Math.min(prev.kitchen || 1, limits.kitchen),
        bedroom: Math.min(prev.bedroom || 1, limits.bedroom),
        bathroom: Math.min(prev.bathroom || 1, limits.bathroom),
        dining: Math.min(prev.dining || 1, limits.dining),
      }));
    }
  }, [bhkType]);

  const updateRoomCount = (roomId: string, increment: number) => {
    setRoomCounts(prev => {
      let newCount = (prev[roomId] || 0) + increment;
      const limits = getMaxLimits(bhkType) as Record<string, number>;
      const max = limits[roomId] !== undefined ? limits[roomId] : 10;
      if (newCount > max) newCount = max;
      if (newCount < 0) newCount = 0;
      return { ...prev, [roomId]: newCount };
    });
  };

  const calculateEstimate = () => {
    if (type === "full-home") {
      if (bhkType === "1bhk") {
        return bhkSubSize === "1bhk-small" ? "₹7 Lakhs" : "₹10 Lakhs";
      } else if (bhkType === "2bhk") {
        return bhkSubSize === "2bhk-small" ? "₹12 - 15 Lakhs" : "₹15 - 18 Lakhs";
      } else if (bhkType === "3bhk") {
        return bhkSubSize === "3bhk-small" ? "₹15 - 18 Lakhs" : "₹22+ Lakhs";
      } else if (bhkType === "4bhk") {
        return bhkSubSize === "4bhk-small" ? "₹20+ Lakhs" : "₹25+ Lakhs";
      } else if (bhkType === "bungalow" || bhkType === "4plus") {
        return "₹25 Lakhs";
      }
      return "₹7 Lakhs";
    }

    let minPrice = 0;
    let maxPrice = 0;
    let packageMultiplier = 1;

    if (selectedPackage === "essentials") packageMultiplier = 1;
    else if (selectedPackage === "premium") packageMultiplier = 1.5;
    else if (selectedPackage === "luxe") packageMultiplier = 2.5;

    if (type === "kitchen") {
      let basePrice = 150000;
      if (kitchenLayout === "U-shaped") basePrice = 200000;
      else if (kitchenLayout === "L-shaped") basePrice = 180000;
      else if (kitchenLayout === "Parallel") basePrice = 170000;

      minPrice = basePrice * packageMultiplier;
      maxPrice = minPrice * 1.25;
    } else if (type === "wardrobe") {
      let lengthMultiplier = 1;
      if (wardrobeLength === "4 ft") lengthMultiplier = 1;
      else if (wardrobeLength === "6 ft") lengthMultiplier = 1.5;
      else if (wardrobeLength === "7 ft") lengthMultiplier = 1.75;
      else if (wardrobeLength === "9 ft") lengthMultiplier = 2.25;

      let basePrice = 40000 * lengthMultiplier;
      if (wardrobeType === "Sliding") basePrice *= 1.2;
      if (wardrobeFinish === "Premium") basePrice *= 1.3;
      else if (wardrobeFinish === "Luxe") basePrice *= 1.6;

      const accessoriesCost = wardrobeAccessories.length * 5000;
      minPrice = basePrice + accessoriesCost;
      maxPrice = minPrice * 1.2;
    }

    const formatPrice = (price: number) => {
      if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lacs`;
      return `₹${price.toLocaleString()}`;
    };

    return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
  };

  const sendToWhatsApp = () => {
    const phoneNumber = "919545002017";

    let details = `👤 *Contact Details:*\n- *Name:* ${contact.name}\n- *Email:* ${contact.email}\n- *Phone:* ${contact.phone}\n\n`;
    details += `🏡 *Project Details:*\n- *Project Type:* ${type === 'full-home' ? 'Full Home Interior' : type === 'kitchen' ? 'Kitchen Interior' : 'Wardrobe'}\n`;

    if (type === "full-home") {
      details += `- *BHK:* ${bhkOptions.find(o => o.id === bhkType)?.label || bhkType} ${bhkSubSize ? `(${bhkSubSize})` : ''}\n`;
      details += `- *Rooms:* Living (${roomCounts.living || 0}), Kitchen (${roomCounts.kitchen || 0}), Bedroom (${roomCounts.bedroom || 0}), Bathroom (${roomCounts.bathroom || 0}), Dining (${roomCounts.dining || 0})\n`;
    } else if (type === "kitchen") {
      details += `- *Layout:* ${kitchenLayout}\n`;
    } else if (type === "wardrobe") {
      details += `- *Length:* ${wardrobeLength}\n- *Type:* ${wardrobeType}\n- *Finish:* ${wardrobeFinish}\n- *Accessories:* ${wardrobeAccessories.join(", ") || "None"}\n`;
    }

    if (type === "full-home" || type === "kitchen") {
      details += `- *Package Selected:* ${selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)}\n`;
    }

    details += `\n💰 *Estimated Quote:*\n*${calculateEstimate()}*\n`;

    const message = `Hello *Artz Interior*! 👋\nI used your website calculator and would like to request a final quote.\n\nHere are my requirements:\n\n${details}\nPlease let me know the next steps!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const downloadQuote = () => {
    const estimate = calculateEstimate();
    const isFullHome = type === 'full-home';
    let minPrice = 0;
    let maxPrice = 0;
    
    if (!isFullHome) {
      const estimateMatch = estimate.match(/₹([\d,]+)\s*-\s*₹([\d,]+)/);
      minPrice = estimateMatch ? parseInt(estimateMatch[1].replace(/,/g, '')) : 0;
      maxPrice = estimateMatch ? parseInt(estimateMatch[2].replace(/,/g, '')) : 0;
    }
    
    const avgPrice = Math.round((minPrice + maxPrice) / 2);
    const gst = Math.round(avgPrice * 0.18);
    const totalWithGst = avgPrice + gst;

    const billNo = `ARTZ-${new Date().getFullYear()}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    const billDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const projectType = type === 'full-home' ? 'Full Home Interior' : type === 'kitchen' ? 'Kitchen Interior' : 'Wardrobe';

    // Create HTML content for PDF
    let htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Georgia', serif;
            margin: 0;
            padding: 40px;
            background: #f5f5f5;
        }
        .invoice {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 50px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #D4AF37;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 32px;
            font-weight: bold;
            color: #1a1a1a;
            margin-bottom: 5px;
        }
        .tagline {
            font-size: 14px;
            color: #666;
            font-style: italic;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #D4AF37;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
            margin: 25px 0 15px 0;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .info-row {
            display: flex;
            margin: 10px 0;
        }
        .info-label {
            font-weight: bold;
            width: 150px;
            color: #333;
        }
        .info-value {
            color: #555;
            flex: 1;
        }
        .price-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .price-table th {
            background: #D4AF37;
            color: white;
            padding: 12px;
            text-align: left;
        }
        .price-table td {
            padding: 12px;
            border-bottom: 1px solid #eee;
        }
        .total-row {
            background: #f9f9f9;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #666;
        }
        .terms {
            font-size: 11px;
            color: #777;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="invoice">
        <div class="header">
            <div class="logo">ARTZ INTERIOR</div>
            <div class="tagline">Transforming Spaces, Creating Dreams Since 2017</div>
        </div>

        <div class="section-title">Bill Details</div>
        <div class="info-row">
            <div class="info-label">Bill No:</div>
            <div class="info-value">${billNo}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Date:</div>
            <div class="info-value">${billDate}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Valid Until:</div>
            <div class="info-value">${validUntil}</div>
        </div>

        <div class="section-title">Customer Information</div>
        <div class="info-row">
            <div class="info-label">Name:</div>
            <div class="info-value">${contact.name}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Email:</div>
            <div class="info-value">${contact.email}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Phone:</div>
            <div class="info-value">+91 ${contact.phone}</div>
        </div>

        <div class="section-title">Project Details</div>
        <div class="info-row">
            <div class="info-label">Project Type:</div>
            <div class="info-value">${projectType}</div>
        </div>
`;

    if (type === "full-home") {
      const propertySize = bhkOptions.find(o => o.id === bhkType)?.label || bhkType;
      const sizeInfo = bhkSubSize ? `(${bhkSubSize})` : '';
      htmlContent += `
        <div class="info-row">
            <div class="info-label">Property Size:</div>
            <div class="info-value">${propertySize} ${sizeInfo}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Rooms:</div>
            <div class="info-value">Living: ${roomCounts.living || 0}, Kitchen: ${roomCounts.kitchen || 0}, Bedroom: ${roomCounts.bedroom || 0}, Bathroom: ${roomCounts.bathroom || 0}, Dining: ${roomCounts.dining || 0}</div>
        </div>
`;
    } else if (type === "kitchen") {
      htmlContent += `
        <div class="info-row">
            <div class="info-label">Kitchen Layout:</div>
            <div class="info-value">${kitchenLayout}</div>
        </div>
`;
    } else if (type === "wardrobe") {
      const accessories = wardrobeAccessories.join(", ") || "None";
      htmlContent += `
        <div class="info-row">
            <div class="info-label">Wardrobe Length:</div>
            <div class="info-value">${wardrobeLength}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Wardrobe Type:</div>
            <div class="info-value">${wardrobeType}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Wardrobe Finish:</div>
            <div class="info-value">${wardrobeFinish}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Accessories:</div>
            <div class="info-value">${accessories}</div>
        </div>
`;
    }

    if (type === "full-home" || type === "kitchen") {
      const packageLevel = selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1);
      htmlContent += `
        <div class="info-row">
            <div class="info-label">Package Level:</div>
            <div class="info-value">${packageLevel}</div>
        </div>
`;
    }

    const avgPriceFormatted = avgPrice.toLocaleString('en-IN');
    const gstFormatted = gst.toLocaleString('en-IN');
    const totalFormatted = totalWithGst.toLocaleString('en-IN');

    htmlContent += `
        <div class="section-title">Price Breakdown</div>
        <table class="price-table">
            <tr>
                <th>Description</th>
                <th>Amount</th>
            </tr>
            <tr>
                <td>Estimated Quote</td>
                <td>${estimate}</td>
            </tr>
            ${!isFullHome ? `
            <tr>
                <td>Average Estimate</td>
                <td>₹${avgPriceFormatted}</td>
            </tr>
            <tr>
                <td>GST (18%)</td>
                <td>₹${gstFormatted}</td>
            </tr>
            <tr class="total-row">
                <td><strong>TOTAL WITH GST</strong></td>
                <td><strong>₹${totalFormatted}</strong></td>
            </tr>
            ` : ''}
        </table>

        <div class="section-title">Terms & Conditions</div>
        <div class="terms">
            <p>1. This is an indicative estimate. Final price may vary based on exact measurements, finishes, and specific requirements.</p>
            <p>2. GST @ 18% is applicable as per government regulations.</p>
            <p>3. This quotation is valid for 30 days from the date of issue.</p>
            <p>4. 50% advance payment required to initiate the project.</p>
            <p>5. Balance payment to be made before final handover.</p>
        </div>

        <div class="section-title">Contact Information</div>
        <div class="info-row">
            <div class="info-label">WhatsApp:</div>
            <div class="info-value">+91 9545002017</div>
        </div>
        <div class="info-row">
            <div class="info-label">Email:</div>
            <div class="info-value">artinteriorz17@gmail.com</div>
        </div>
        <div class="info-row">
            <div class="info-label">Address:</div>
            <div class="info-value">Artz Interior, Mumbai, Maharashtra, India</div>
        </div>

        <div class="footer">
            <p>Thank you for choosing Artz Interior!</p>
            <p>Transforming Spaces, Creating Dreams Since 2017</p>
        </div>
    </div>
</body>
</html>
`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Artz_Interior_Quote_${new Date().getTime()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sendEmailOtp = async (): Promise<void> => {
    if (!contact.email.trim()) {
      throw new Error('Email is required');
    }

    try {
      const { error, data } = await supabase.auth.signInWithOtp({
        email: contact.email,
        options: {
          shouldCreateUser: true,
        }
      });

      if (error) {
        console.error("Supabase Auth Error:", error);
        throw new Error(error.message === "{}" || !error.message 
          ? `Auth Error [${error.status || 'unknown'}]: Please check Supabase Auth settings or keys.` 
          : error.message);
      }
      
      console.log("Supabase OTP sent successfully:", data);
      
      // Show email verification modal
      setShowEmailModal(true);
      goToVerificationStep();
    } catch (err: unknown) {
      console.error("Caught error in sendEmailOtp:", err);
      const message = err instanceof Error ? err.message : JSON.stringify(err);
      setOtpError(message);
      throw err;
    }
  };

  const resendEmailOtp = async (): Promise<void> => {
    await sendEmailOtp();
  };

  const handleVerified = async (idToken: string): Promise<void> => {
    setIsSubmittingLead(true);
    try {
      // Use Supabase to insert the lead
      const { error } = await supabase.from('leads').insert([{
        name: contact.name,
        email: contact.email,
        phone: formatPhoneToE164(contact.phone),
        whatsapp: contact.whatsapp,
        project_type: type,
        bhk_type: bhkType,
        bhk_sub_size: bhkSubSize,
        room_counts: roomCounts,
        kitchen_layout: kitchenLayout,
        wardrobe_length: wardrobeLength,
        wardrobe_type: wardrobeType,
        wardrobe_finish: wardrobeFinish,
        wardrobe_accessories: wardrobeAccessories,
        selected_package: selectedPackage,
        estimated_quote: calculateEstimate(),
      }]);

      if (error) {
        console.error("Lead save failed:", error.message);
      }

      goToEstimationStep();
    } catch (err) {
      console.error("handleVerified error:", err);
      // Still show estimation even if lead save fails
      goToEstimationStep();
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const currentStepName = steps[currentStepIndex];

  return (
    <div className="min-h-screen bg-ivory flex flex-col font-sans pt-24">
      {/* Persistent reCAPTCHA container */}
      {recaptchaContainer()}
      {/* Email Verification Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <EmailVerificationModal
            open={showEmailModal}
            email={contact.email}
            onClose={() => setShowEmailModal(false)}
            onVerified={handleVerified}
            onResend={resendEmailOtp}
            isResending={otpLoading}
          />
        )}
      </AnimatePresence>
      {/* Progress Bar */}
      <div className="bg-warm-white py-4 shadow-luxury mb-8 sticky top-20 z-10 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 right-0 top-1/2 h-px bg-border -z-10"></div>
            <div
              className="absolute left-0 top-1/2 h-px bg-gold -z-10 transition-all duration-500"
              style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            ></div>

            {steps.map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center bg-warm-white transition-all duration-300 ${isCompleted || isCurrent ? 'border-gold' : 'border-border'}`}>
                    {isCompleted && <CheckCircle2 className="w-4 h-4 text-gold" strokeWidth={2} />}
                    {isCurrent && <div className="w-3 h-3 bg-gold rounded-full"></div>}
                  </div>
                  <span className={`text-[10px] font-semibold mt-2 text-center uppercase tracking-luxury transition-colors hidden sm:block ${isCompleted || isCurrent ? 'text-charcoal' : 'text-muted-foreground'}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-4 sm:absolute sm:right-6 sm:top-1/2 sm:-translate-y-1/2 sm:mt-0 text-xs font-bold tracking-luxury uppercase text-muted-foreground bg-ivory px-4 py-2 rounded-full border border-border inline-block">
            Step {currentStepIndex + 1} of {steps.length}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow flex items-start justify-center px-6 pb-20">
        <div className="bg-warm-white rounded-2xl shadow-luxury w-full max-w-2xl overflow-hidden border border-border">
          <div className="p-8 sm:p-10">

            {/* Step: BHK TYPE */}
            {currentStepName === "BHK TYPE" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-10">
                  <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4 leading-tight">Select your BHK type</h2>
                  <p className="text-muted-foreground text-sm">
                    To know more about this, <button className="text-gold hover:underline font-medium">click here</button>
                  </p>
                </div>

                <div className="space-y-4">
                  {bhkOptions.map((option) => (
                    <div key={option.id} className="border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-luxury">
                      <div
                        className={`p-5 cursor-pointer flex items-center justify-between transition-all ${bhkType === option.id ? 'border-gold bg-gradient-to-r from-ivory to-warm-white' : 'hover:bg-ivory'}`}
                        onClick={() => {
                          if (option.subOptions) {
                            setExpandedBhk(expandedBhk === option.id ? null : option.id);
                          } else {
                            setBhkType(option.id);
                            setBhkSubSize("");
                          }
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${bhkType === option.id ? 'border-gold bg-gold' : 'border-border hover:border-gold'}`}>
                            {bhkType === option.id && <CheckCircle2 className="w-4 h-4 text-warm-white" strokeWidth={2} />}
                          </div>
                          <span className="font-semibold text-charcoal text-lg">{option.label}</span>
                        </div>
                        {option.subOptions && (
                          <div className="text-gray-400 transition-transform">
                            {expandedBhk === option.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                          </div>
                        )}
                      </div>

                      {/* Sub-options (Accordion) */}
                      {option.subOptions && expandedBhk === option.id && (
                        <div className="p-5 bg-gradient-to-b from-ivory to-warm-white border-t border-border flex flex-col sm:flex-row gap-4">
                          {option.subOptions.map(sub => (
                            <div
                              key={sub.id}
                              className={`flex-1 border-2 p-5 rounded-xl cursor-pointer transition-all ${bhkType === option.id && bhkSubSize === sub.id ? 'border-gold bg-warm-white shadow-luxury' : 'border-border bg-warm-white hover:border-gold hover:shadow-luxury'}`}
                              onClick={() => {
                                setBhkType(option.id);
                                setBhkSubSize(sub.id);
                              }}
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${bhkType === option.id && bhkSubSize === sub.id ? 'border-gold bg-gold' : 'border-border'}`}>
                                  {bhkType === option.id && bhkSubSize === sub.id && <CheckCircle2 className="w-3 h-3 text-warm-white" strokeWidth={2} />}
                                </div>
                                <span className="font-bold text-charcoal">{sub.label}</span>
                              </div>
                              <div className="text-sm text-muted-foreground ml-8">{sub.desc}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step: KITCHEN LAYOUT / WARDROBE TYPE (Alternatives for step 1) */}
            {currentStepName === "KITCHEN LAYOUT" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4 leading-tight">Select the layout of your kitchen</h2>
                  <p className="text-muted-foreground text-sm">
                    Want to know more. <button className="text-gold hover:underline font-medium">Check here</button>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                  {[
                    { id: "L-shaped", name: "L-shaped", icon: "L", desc: "Perfect for corners" },
                    { id: "Straight", name: "Straight", icon: "I", desc: "Simple & efficient" },
                    { id: "U-shaped", name: "U-shaped", icon: "U", desc: "Maximum storage" },
                    { id: "Parallel", name: "Parallel", icon: "||", desc: "Great for narrow spaces" }
                  ].map((layout) => (
                    <div
                      key={layout.id}
                      className={`border-2 rounded-2xl overflow-hidden cursor-pointer w-full max-w-[200px] relative transition-all duration-300 bg-warm-white ${kitchenLayout === layout.id ? 'border-gold shadow-luxury' : 'border-border hover:border-gold hover:shadow-luxury'}`}
                      onClick={() => setKitchenLayout(layout.id)}
                    >
                      <div className="absolute top-3 right-3 z-10">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center bg-warm-white transition-all ${kitchenLayout === layout.id ? 'border-gold bg-gold' : 'border-border hover:border-gold'}`}>
                          {kitchenLayout === layout.id && <CheckCircle2 className="w-4 h-4 text-warm-white" strokeWidth={2} />}
                        </div>
                      </div>

                      <div className="h-40 bg-gradient-to-br from-ivory to-warm-white flex items-center justify-center p-4">
                        {/* Placeholder SVG for Layout */}
                        {layout.icon === 'L' && (
                          <div className="w-16 h-16 border-l-8 border-b-8 border-gold/30 rounded-bl relative">
                            <div className="absolute top-2 left-2 w-3 h-3 bg-gold/80 rounded-sm"></div>
                            <div className="absolute bottom-2 right-2 w-3 h-3 bg-gold/80 rounded-sm"></div>
                          </div>
                        )}
                        {layout.icon === 'I' && (
                          <div className="w-24 h-6 bg-gold/30 rounded flex items-center justify-between px-2">
                            <div className="w-3 h-3 bg-gold/80 rounded-sm"></div>
                            <div className="w-3 h-3 bg-gold/80 rounded-sm"></div>
                          </div>
                        )}
                        {layout.icon === 'U' && (
                          <div className="w-16 h-16 border-l-8 border-b-8 border-r-8 border-gold/30 rounded-b relative">
                            <div className="absolute top-2 left-2 w-3 h-3 bg-gold/80 rounded-sm"></div>
                            <div className="absolute top-2 right-2 w-3 h-3 bg-gold/80 rounded-sm"></div>
                          </div>
                        )}
                        {layout.icon === '||' && (
                          <div className="flex flex-col gap-4">
                            <div className="w-24 h-6 bg-gold/30 rounded flex items-center justify-end px-2">
                              <div className="w-3 h-3 bg-gold/80 rounded-sm"></div>
                            </div>
                            <div className="w-24 h-6 bg-gold/30 rounded flex items-center justify-start px-2">
                              <div className="w-3 h-3 bg-gold/80 rounded-sm"></div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-4 text-center border-t border-border bg-gradient-to-b from-warm-white to-ivory">
                        <span className="font-bold text-charcoal text-base block mb-1">{layout.name}</span>
                        <span className="text-xs text-muted-foreground">{layout.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStepName === "LENGTH" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4 leading-tight">What is the height of your wardrobe?</h2>
                  <p className="text-muted-foreground text-sm">
                    Want to know more. <button className="text-gold hover:underline font-medium">Check here</button>
                  </p>
                </div>
                <div className="bg-gradient-to-r from-ivory to-warm-white border border-gold/30 text-charcoal text-xs uppercase tracking-luxury text-center py-3 rounded-xl mb-8 font-bold shadow-luxury">
                  Standard size has been set for your convenience
                </div>
                <div className="space-y-4">
                  {["4 ft", "6 ft", "7 ft", "9 ft"].map((height) => (
                    <div
                      key={height}
                      className={`border-2 p-5 rounded-xl cursor-pointer flex items-center gap-4 transition-all duration-300 bg-warm-white ${wardrobeLength === height ? 'border-gold shadow-luxury' : 'border-border hover:border-gold hover:shadow-luxury'}`}
                      onClick={() => setWardrobeLength(height)}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${wardrobeLength === height ? 'border-gold bg-gold' : 'border-border hover:border-gold'}`}>
                        {wardrobeLength === height && <CheckCircle2 className="w-4 h-4 text-warm-white" strokeWidth={2} />}
                      </div>
                      <span className="font-bold text-charcoal text-lg">{height}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStepName === "TYPE" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4 leading-tight">Select the type of wardrobe</h2>
                </div>
                <div className="space-y-6">
                  {[
                    { id: "Sliding", label: "Sliding", desc: "Movable doors that slide horizontally along a metal rail and save floor space.", img: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&q=80&w=600", tip: "Make a style statement even in a compact space." },
                    { id: "Swing", label: "Swing", desc: "Movable doors that swing out to open, giving better visibility and storage space.", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=600", tip: "A cost-effective option that never goes out of style." }
                  ].map((wType) => (
                    <div
                      key={wType.id}
                      className={`border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 bg-warm-white ${wardrobeType === wType.id ? 'border-gold shadow-luxury' : 'border-border hover:border-gold hover:shadow-luxury'}`}
                      onClick={() => setWardrobeType(wType.id)}
                    >
                      <div className="p-5 flex items-start gap-4 border-b border-border bg-gradient-to-r from-warm-white to-ivory">
                        <div className={`w-6 h-6 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${wardrobeType === wType.id ? 'border-gold bg-gold' : 'border-border hover:border-gold'}`}>
                          {wardrobeType === wType.id && <CheckCircle2 className="w-4 h-4 text-warm-white" strokeWidth={2} />}
                        </div>
                        <div>
                          <h3 className="font-bold text-charcoal text-base">{wType.label}</h3>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{wType.desc}</p>
                        </div>
                      </div>
                      <div className="h-52 w-full overflow-hidden bg-gradient-to-br from-ivory to-warm-white">
                        <img src={wType.img} alt={wType.label} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-4 bg-gradient-to-b from-ivory to-warm-white text-sm text-muted-foreground border-t border-border">
                        <span className="font-semibold text-gold">💡 {wType.tip}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStepName === "FINISH" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4 leading-tight">Select your preferred finish</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { id: "Standard", label: "Standard - Laminate", price: "₹₹", tip: "Looking for a seamless finish that sits well with every interior? This one's for you.", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600" },
                    { id: "Premium", label: "Premium - Membrane", price: "₹₹₹", tip: "Get a magazine-like look that requires low maintenance.", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600" },
                    { id: "Luxe", label: "Luxe - Acrylic", price: "₹₹₹₹", tip: "Adds a touch of luxury to your modular wardrobe.", img: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=600" }
                  ].map((wFinish) => (
                    <div
                      key={wFinish.id}
                      className={`border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 bg-warm-white ${wardrobeFinish === wFinish.id ? 'border-gold shadow-luxury' : 'border-border hover:border-gold hover:shadow-luxury'}`}
                      onClick={() => setWardrobeFinish(wFinish.id)}
                    >
                      <div className="p-4 flex items-center gap-3 border-b border-border bg-gradient-to-r from-warm-white to-ivory">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${wardrobeFinish === wFinish.id ? 'border-gold bg-gold' : 'border-border hover:border-gold'}`}>
                          {wardrobeFinish === wFinish.id && <CheckCircle2 className="w-4 h-4 text-warm-white" strokeWidth={2} />}
                        </div>
                        <h3 className="font-bold text-charcoal text-sm">{wFinish.label}</h3>
                      </div>
                      <div className="h-40 w-full overflow-hidden bg-gradient-to-br from-ivory to-warm-white">
                        <img src={wFinish.img} alt={wFinish.label} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-4 bg-gradient-to-b from-ivory to-warm-white">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-muted-foreground">PRICE</span>
                          <span className="text-sm font-bold text-charcoal">{wFinish.price}</span>
                        </div>
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          <span className="font-semibold text-gold">💡</span> {wFinish.tip}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStepName === "ACCESSORIES" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
                <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-10 leading-tight text-center">Add your preferred accessories (optional)</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { id: "loft", label: "Loft", img: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=400" },
                    { id: "single-drawer", label: "Single full-size drawer", img: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=400" },
                    { id: "1-half-drawer", label: "1 half-drawer", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400" },
                    { id: "2-half-drawers", label: "2 half-drawers", img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=400" },
                    { id: "wicker-pull-out", label: "Wicker pull out", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400" }
                  ].map((acc) => {
                    const isSelected = wardrobeAccessories.includes(acc.id);
                    return (
                      <div
                        key={acc.id}
                        className={`border rounded-lg overflow-hidden cursor-pointer transition-all bg-warm-white relative ${isSelected ? 'border-gold shadow-luxury' : 'border-border hover:border-gold shadow-sm'}`}
                        onClick={() => {
                          if (isSelected) {
                            setWardrobeAccessories(wardrobeAccessories.filter(id => id !== acc.id));
                          } else {
                            setWardrobeAccessories([...wardrobeAccessories, acc.id]);
                          }
                        }}
                      >
                        <div className="absolute top-2 right-2 z-10">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center bg-warm-white ${isSelected ? 'border-gold bg-gold' : 'border-border'}`}>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-warm-white" strokeWidth={2} />}
                          </div>
                        </div>
                        <div className="h-32 w-full overflow-hidden bg-ivory">
                          <img src={acc.img} alt={acc.label} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3 text-center border-t border-border text-[11px] font-medium text-charcoal">
                          {acc.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step: ROOMS TO DESIGN */}
            {currentStepName === "ROOMS TO DESIGN" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-lg mx-auto">
                <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4 leading-tight text-center">Select the rooms you'd like us to design</h2>
                <p className="text-center text-muted-foreground mb-10">
                  To know more about this, <button className="text-gold hover:underline">click here</button>
                </p>

                <div className="space-y-3">
                  {roomsToDesign.map((room) => (
                    <div key={room.id} className="border border-border rounded shadow-luxury p-4 flex items-center justify-between bg-warm-white hover:border-gold transition-colors">
                      <span className="font-medium text-charcoal">{room.label}</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateRoomCount(room.id, -1)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-warm-white transition-colors ${roomCounts[room.id] > 0 ? 'bg-gold hover:bg-gold/80' : 'bg-gold/30 cursor-not-allowed'}`}
                          disabled={roomCounts[room.id] === 0}
                        >
                          <Minus size={14} strokeWidth={2} />
                        </button>
                        <span className="w-4 text-center font-semibold text-charcoal">{roomCounts[room.id] || 0}</span>
                        <button
                          onClick={() => updateRoomCount(room.id, 1)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-warm-white transition-colors ${(getMaxLimits(bhkType) as Record<string, number>)[room.id] !== undefined && (roomCounts[room.id] || 0) >= (getMaxLimits(bhkType) as Record<string, number>)[room.id]
                            ? 'bg-gold/30 cursor-not-allowed'
                            : 'bg-gold hover:bg-gold/80'
                            }`}
                          disabled={(getMaxLimits(bhkType) as Record<string, number>)[room.id] !== undefined && (roomCounts[room.id] || 0) >= (getMaxLimits(bhkType) as Record<string, number>)[room.id]}
                        >
                          <Plus size={14} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step: PACKAGE */}
            {currentStepName === "PACKAGE" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-lg mx-auto">
                <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-10 leading-tight text-center">Pick your package</h2>

                <div className="space-y-6">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`border rounded overflow-hidden cursor-pointer transition-all bg-warm-white ${selectedPackage === pkg.id ? 'border-gold shadow-luxury' : 'border-border hover:border-gold shadow-luxury'}`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      <div className="p-4 flex items-start gap-3">
                        <div className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPackage === pkg.id ? 'border-gold' : 'border-border'}`}>
                          {selectedPackage === pkg.id && <div className="w-2.5 h-2.5 bg-gold rounded-full"></div>}
                        </div>
                        <div>
                          <h3 className="font-semibold text-charcoal text-sm">{pkg.label}</h3>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{pkg.desc}</p>
                        </div>
                      </div>

                      <div className="h-48 bg-ivory w-full relative overflow-hidden">
                        <img
                          src={pkg.image || `https://images.unsplash.com/photo-${pkg.id === 'essentials' ? '1586023492125-27b2c045efd7' : '1600210492486-724fe5c67fb0'}?auto=format&fit=crop&q=80&w=800`}
                          alt={pkg.label}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-4 bg-warm-white">
                        <ul className="space-y-2.5">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-gold mr-2 shrink-0" strokeWidth={2} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step: CONTACT INFO */}
            {currentStepName === "CONTACT INFO" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4 leading-tight">Your estimate is almost ready</h2>
                  <p className="text-muted-foreground text-sm">Enter your details to receive your personalized quote</p>
                </div>

                <form id="quote-form" className="space-y-5" onSubmit={(e) => {
                  e.preventDefault();
                  setOtpLoading(true);
                  setOtpError("");
                  sendEmailOtp().finally(() => setOtpLoading(false));
                }}>
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      className="w-full px-5 py-4 text-base rounded-xl border-2 border-border focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all bg-warm-white text-charcoal"
                      value={contact.name}
                      onChange={e => setContact({ ...contact, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      className="w-full px-5 py-4 text-base rounded-xl border-2 border-border focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all bg-warm-white text-charcoal"
                      value={contact.email}
                      onChange={e => setContact({ ...contact, email: e.target.value })}
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none border-r-2 border-border my-3 pr-3">
                      <span className="text-lg flex items-center gap-2"><span>🇮🇳</span> <span className="text-muted-foreground text-xs">▼</span></span>
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      className="w-full pl-[5.5rem] pr-5 py-4 text-base rounded-xl border-2 border-border focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all bg-warm-white text-charcoal"
                      value={contact.phone}
                      onChange={e => setContact({ ...contact, phone: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${contact.whatsapp ? 'bg-gold border-gold' : 'border-border hover:border-gold'}`}>
                        {contact.whatsapp && <CheckCircle2 className="w-3.5 h-3.5 text-warm-white" strokeWidth={2} />}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={contact.whatsapp}
                        onChange={e => setContact({ ...contact, whatsapp: e.target.checked })}
                      />
                      <span className="text-sm text-charcoal font-medium">Send me updates on WhatsApp</span>
                    </label>
                  </div>

                  <div className="text-xs text-muted-foreground mt-6 leading-relaxed bg-ivory p-4 rounded-xl">
                    By submitting this form, you agree to the <a href="#" className="text-gold hover:underline font-semibold">privacy policy</a> & <a href="#" className="text-gold hover:underline font-semibold">terms and conditions</a>
                    <br /><br />
                    This site is protected by reCAPTCHA and the Google <a href="#" className="text-gold hover:underline font-semibold">Privacy Policy</a> and <a href="#" className="text-gold hover:underline font-semibold">Terms of Service</a> apply.
                  </div>
                  {otpError && (
                    <div className="text-amber-700 text-sm text-center bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mt-4 leading-relaxed">
                      ⚠️ {otpError}
                    </div>
                  )}
                  <button type="submit" disabled={otpLoading} className="w-full mt-6 px-6 py-4 bg-gold hover:bg-gold/90 text-warm-white rounded-xl font-bold text-base tracking-luxury uppercase transition-all shadow-luxury disabled:opacity-50 disabled:shadow-none">
                    {otpLoading ? 'SENDING OTP...' : 'SEND OTP'}
                  </button>
                </form>
              </div>
            )}

            {/* Step: VERIFICATION */}
            {currentStepName === "VERIFICATION" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-lg mx-auto text-center">
                <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4 leading-tight text-center">Verify your email</h2>
                <p className="text-center text-muted-foreground mb-10">An OTP has been sent to {contact.email}. Please check the verification modal that has appeared.</p>
                <button
                  type="button"
                  onClick={() => setShowEmailModal(true)}
                  className="px-4 py-2 bg-gold text-warm-white rounded hover:bg-gold/90 transition-colors"
                >
                  Open Verification Modal
                </button>
              </div>
            )}

            {/* Step: ESTIMATION */}
            {currentStepName === "ESTIMATION" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-lg mx-auto font-sans">

                <div className="bg-warm-white rounded-2xl shadow-luxury border border-border overflow-hidden mb-8">
                  {/* Top Success Banner */}
                  <div className="bg-gradient-to-br from-ivory via-warm-white to-ivory/30 pt-10 pb-8 px-6 text-center border-b border-border relative overflow-hidden">
                    {/* Decorative background circle */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-gold/20 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 bg-gold/20 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>

                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-tr from-gold to-gold/80 rounded-full flex items-center justify-center mx-auto mb-5 shadow-luxury ring-4 ring-warm-white">
                        <CheckCircle2 className="w-8 h-8 text-warm-white" strokeWidth={2} />
                      </div>

                      <h2 className="font-display text-[22px] font-bold text-charcoal mb-2">Your Estimated Budget</h2>
                      <p className="text-muted-foreground text-sm mb-6">Customised based on your unique requirements</p>

                      <div className="inline-block bg-warm-white rounded-2xl px-8 py-4 shadow-sm border border-gold/30 mb-6">
                        <div className="text-[40px] font-black text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold/80 tracking-tight leading-none">
                          {calculateEstimate()}*
                        </div>
                      </div>

                      <button onClick={() => setShowSummary(!showSummary)} className="flex items-center justify-center mx-auto text-gold font-semibold text-sm hover:text-gold/80 transition-colors group">
                        {showSummary ? 'Hide details' : 'View detailed summary'}
                        {showSummary ? <ChevronUp className="w-4 h-4 ml-1 group-hover:-translate-y-0.5 transition-transform" /> : <ChevronDown className="w-4 h-4 ml-1 group-hover:translate-y-0.5 transition-transform" />}
                      </button>
                    </div>
                  </div>

                  {/* Collapsible Summary */}
                  {showSummary && (
                    <div className="bg-ivory/80 px-6 py-6 border-b border-border">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-luxury mb-4">Project Specifications</h4>
                      <ul className="space-y-4 text-sm">
                        <li className="flex justify-between items-center"><span className="text-muted-foreground">Project Type</span> <span className="font-medium text-charcoal">{type === 'full-home' ? 'Full Home Interior' : type === 'kitchen' ? 'Kitchen Interior' : 'Wardrobe'}</span></li>
                        {type === "full-home" && <li className="flex justify-between items-center"><span className="text-muted-foreground">Property Size</span> <span className="font-medium text-charcoal">{bhkOptions.find(o => o.id === bhkType)?.label || bhkType} {bhkSubSize && `(${bhkSubSize})`}</span></li>}
                        {type === "kitchen" && <li className="flex justify-between items-center"><span className="text-muted-foreground">Layout</span> <span className="font-medium text-charcoal">{kitchenLayout}</span></li>}
                        {type === "wardrobe" && (
                          <>
                            <li className="flex justify-between items-center"><span className="text-muted-foreground">Dimensions</span> <span className="font-medium text-charcoal">{wardrobeLength}</span></li>
                            <li className="flex justify-between items-center"><span className="text-muted-foreground">Type & Finish</span> <span className="font-medium text-charcoal">{wardrobeType}, {wardrobeFinish}</span></li>
                          </>
                        )}
                        {(type === "full-home" || type === "kitchen") && <li className="flex justify-between items-center"><span className="text-muted-foreground">Package Level</span> <span className="font-medium text-charcoal capitalize">{selectedPackage}</span></li>}
                      </ul>
                    </div>
                  )}

                  {/* Consultation Card */}
                  <div className="bg-charcoal text-warm-white p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full filter blur-xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/20 rounded-full filter blur-xl"></div>

                    <div className="relative">
                      <h2 className="font-display text-[24px] font-bold mb-3 tracking-tight">Need an exact quote?</h2>
                      <p className="text-warm-white/70 text-sm leading-relaxed mb-6 max-w-[280px] mx-auto">
                        Speak with our expert designers to get a precise, customized estimate for your home.
                      </p>

                      <div className="flex flex-col gap-3">
                        <button
                          onClick={sendToWhatsApp}
                          className="w-full bg-gold hover:bg-gold/90 text-warm-white px-8 py-4 rounded-xl font-bold text-sm tracking-luxury uppercase transition-all shadow-luxury transform hover:-translate-y-0.5"
                        >
                          GET DETAILED QUOTE
                        </button>
                        <button
                          onClick={downloadQuote}
                          className="w-full bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all border border-white/20 flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          DOWNLOAD QUOTE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mb-8">
                  <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">The Artz Interior Promise</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="flex flex-col items-center group">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-3 group-hover:border-emerald-200 group-hover:shadow-md transition-all">
                        <span className="text-lg">⏳</span>
                      </div>
                      <span className="text-[11px] text-gray-600 font-medium leading-tight">45-day<br />Delivery</span>
                    </div>
                    <div className="flex flex-col items-center group">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-3 group-hover:border-emerald-200 group-hover:shadow-md transition-all">
                        <span className="text-lg">🛡️</span>
                      </div>
                      <span className="text-[11px] text-gray-600 font-medium leading-tight">10-year<br />Warranty</span>
                    </div>
                    <div className="flex flex-col items-center group">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-3 group-hover:border-emerald-200 group-hover:shadow-md transition-all">
                        <span className="text-lg">✨</span>
                      </div>
                      <span className="text-[11px] text-gray-600 font-medium leading-tight">146 Quality<br />Checks</span>
                    </div>
                    <div className="flex flex-col items-center group">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-3 group-hover:border-emerald-200 group-hover:shadow-md transition-all">
                        <span className="text-lg">💳</span>
                      </div>
                      <span className="text-[11px] text-gray-600 font-medium leading-tight">Flexible<br />EMIs</span>
                    </div>
                  </div>
                </div>

                <div className="text-center pb-6">
                  <p className="text-[11px] text-gray-400 leading-relaxed max-w-sm mx-auto">
                    *This is an indicative estimate. The final price may vary based on exact measurements, finishes, and specific requirements.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Footer Actions */}
          {currentStepName !== "ESTIMATION" && (
            <div className="p-6 border-t border-gray-100 bg-white flex items-center justify-between mt-auto shrink-0">
              <button
                onClick={handleBack}
                className={`font-bold tracking-wide text-sm transition-all px-6 py-3 rounded-lg ${currentStepIndex === 0 ? 'text-gray-300 cursor-not-allowed bg-gray-50' : 'text-[#10b981] hover:bg-emerald-50 hover:text-emerald-700'}`}
                disabled={currentStepIndex === 0}
              >
                ← BACK
              </button>

              {currentStepIndex < steps.length - 1 && currentStepName !== "CONTACT INFO" && currentStepName !== "VERIFICATION" ? (
                <button
                  onClick={handleNext}
                  className={`text-white px-10 py-3 rounded-full font-bold text-sm tracking-wide transition-all shadow-lg ${(currentStepName === "BHK TYPE" && (!bhkType || (bhkType !== "1bhk" && !bhkSubSize))) ||
                    (currentStepName === "KITCHEN LAYOUT" && !kitchenLayout) ||
                    (currentStepName === "LENGTH" && !wardrobeLength) ||
                    (currentStepName === "TYPE" && !wardrobeType) ||
                    (currentStepName === "FINISH" && !wardrobeFinish) ||
                    (currentStepName === "PACKAGE" && !selectedPackage)
                    ? 'bg-gray-300 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-[#10b981] to-emerald-500 hover:from-emerald-500 hover:to-[#10b981] shadow-emerald-200'
                    }`}
                  disabled={
                    (currentStepName === "BHK TYPE" && (!bhkType || (bhkType !== "1bhk" && !bhkSubSize))) ||
                    (currentStepName === "KITCHEN LAYOUT" && !kitchenLayout) ||
                    (currentStepName === "LENGTH" && !wardrobeLength) ||
                    (currentStepName === "TYPE" && !wardrobeType) ||
                    (currentStepName === "FINISH" && !wardrobeFinish) ||
                    (currentStepName === "PACKAGE" && !selectedPackage)
                  }
                >
                  NEXT →
                </button>
              ) : currentStepName === "CONTACT INFO" ? (
                <button
                  type="submit"
                  form="quote-form"
                  disabled={otpLoading}
                  className="bg-gradient-to-r from-[#10b981] to-emerald-500 text-white px-10 py-3 rounded-full font-bold text-sm tracking-wide hover:from-emerald-500 hover:to-[#10b981] transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:shadow-none"
                >
                  {otpLoading ? "SENDING..." : "NEXT"}
                </button>
              ) : currentStepName === "VERIFICATION" ? (
                <button
                  type="button"
                  onClick={() => setShowEmailModal(true)}
                  disabled={isSubmittingLead}
                  className="bg-gradient-to-r from-[#10b981] to-emerald-500 text-white px-10 py-3 rounded-full font-bold text-sm tracking-wide hover:from-emerald-500 hover:to-[#10b981] transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:shadow-none"
                >
                  {isSubmittingLead ? "SUBMITTING..." : "ENTER OTP"}
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

