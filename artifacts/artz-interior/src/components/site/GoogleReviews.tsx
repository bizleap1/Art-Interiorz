import { Reveal, SectionLabel } from "./Reveal";
import { Star } from "lucide-react";
import { useState } from "react";

const GoogleLogo = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const reviewsData = {
  rating: 4.9,
  total_ratings: 154,
  reviews: [
    {
      author_name: "Tarun Sonkusare",
      profile_photo_url: "/assets/tarun.png",
      rating: 5,
      relative_time_description: "3 weeks ago",
      text: "Exceptional Design & Modern Functionality! We recently completed a full home renovation with the help of art interiorz and the results are absolutely stunning. They have transformed our space into a perfect blend of contemporary elegance, warmth, and highly efficient functionality. Team is very helpful and coordinates time to time, covers every single part of home.",
    },
    {
      author_name: "Swaraj Umredkar",
      profile_photo_url: "/assets/swaraj.png",
      rating: 5,
      relative_time_description: "3 weeks ago",
      text: "Superb work! Truly happy with the outcome. We recently worked with team ART Interiors, and honestly, they did a fantastic job. Right from the first meeting, unhone hamari requirements ko bohot achhe se samjha. Unka space planning aur design sense is top-notch, every corner of our house has been properly utilised. The attention to detail is superb. Highly recommend team ART Interiors, Manish Nagar, Nagpur! Special Thanks to Valay, Akshay, Kamlesh and Obviously, Priya and Kapil Sir. Thankssss a lotttt, Guys!",
    },
    {
      author_name: "Dr Lalit Kukde",
      profile_photo_url: "/assets/dr_lalit.png",
      rating: 5,
      relative_time_description: "6 months ago",
      text: "....ART INTERIOZ Gave a Premium Design with Elite look to our New Home \"Uditi\"..... From the day first till handover the experience was awesome. The Director, Mr. Kapil and his team considered our all minute to minute requirements and excecuted so well in real. Regular visits, timely co-ordination, all purchasing guidance with expert opinion as well their dedication at project impressed us a lot. They have experties in interiors and designing. .... ART INTERIOZ made our House.. to... A DREAM HOME. We are extremely happy and satisfied with their work.",
    },
    {
      author_name: "Ankesh Shahu",
      profile_photo_url: "/assets/ankesh.png",
      rating: 5,
      relative_time_description: "3 weeks ago",
      text: "We recently got our home renovated by Art Interiorz and are extremely happy with the outcome. Renovation projects can be challenging, but the team handled everything professionally and efficiently. They transformed our existing space beautifully while taking care of every detail. The quality of work, coordination, and execution were excellent throughout the project. We would definitely recommend Art Interiorz to anyone looking for home renovation and interior design services.",
    },
    {
      author_name: "Vijaya Mehar",
      profile_photo_url: "/assets/vijaya.png",
      rating: 5,
      relative_time_description: "5 months ago",
      text: "I had a wonderful experience working with this team for our architectural and interior design requirements. From planning to execution, their approach was highly professional, thoughtful, and detail-oriented. They truly understood our needs, space constraints, and aesthetic preferences, and translated them into a well-balanced, functional, and elegant design. The team was transparent with timelines and costs, proactive in communication, and very supportive throughout the process. We are extremely satisfied with the final outcome.",
    },
    {
      author_name: "Yash Paradkar",
      profile_photo_url: "/assets/yash.png",
      rating: 5,
      relative_time_description: "2 weeks ago",
      text: "“Art Interiorz exceeded my expectations with their creativity, professionalism, and attention to detail. The team carefully understood my requirements and transformed my space into a beautiful, functional, and modern environment. Their project management was smooth, communication was transparent, and the quality of workmanship was outstanding. The entire project was completed with great dedication and precision. I highly recommend Art Interiorz to anyone looking for innovative interior design solutions and reliable execution.”",
    }
  ]
};

export function GoogleReviews() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-24 lg:py-36 bg-warm-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <Reveal><SectionLabel>Client Testimonials</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.07] text-charcoal">
                What People Say On <em className="italic text-gradient-gold">Google</em>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-5 bg-white px-6 py-4 rounded-xl border border-border shadow-sm">
                <GoogleLogo className="w-10 h-10" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-2xl text-charcoal">{reviewsData.rating.toFixed(1)}</span>
                    <div className="flex text-[#fbbc04]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill={i < Math.round(reviewsData.rating) ? "currentColor" : "none"} className={i < Math.round(reviewsData.rating) ? "text-[#fbbc04]" : "text-gray-300"} />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">Based on {reviewsData.total_ratings} reviews</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Marquee Slider Container */}
        <Reveal delay={0.3}>
          <div 
            className="flex overflow-hidden relative w-full gap-6 pb-8 group cursor-pointer"
            onClick={() => setIsPaused(!isPaused)}
          >
            <div 
              className="flex shrink-0 animate-marquee gap-6"
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
              {reviewsData.reviews.map((review, idx) => (
                <div key={idx} className="w-[85vw] md:w-[45vw] lg:w-[30vw] shrink-0 bg-white p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <img 
                        src={review.profile_photo_url} 
                        alt={review.author_name} 
                        className="w-12 h-12 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-semibold text-charcoal">{review.author_name}</h4>
                        <span className="text-xs text-muted-foreground">{review.relative_time_description}</span>
                      </div>
                    </div>
                    <GoogleLogo className="w-5 h-5 opacity-90" />
                  </div>
                  <div className="flex text-[#fbbc04] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-[#fbbc04]" : "text-gray-300"} />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 whitespace-normal">
                    "{review.text}"
                  </p>
                </div>
              ))}
            </div>
            
            {/* Duplicate for seamless looping */}
            <div 
              className="flex shrink-0 animate-marquee gap-6" 
              aria-hidden="true"
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
              {reviewsData.reviews.map((review, idx) => (
                <div key={`dup-${idx}`} className="w-[85vw] md:w-[45vw] lg:w-[30vw] shrink-0 bg-white p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <img 
                        src={review.profile_photo_url} 
                        alt={review.author_name} 
                        className="w-12 h-12 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-semibold text-charcoal">{review.author_name}</h4>
                        <span className="text-xs text-muted-foreground">{review.relative_time_description}</span>
                      </div>
                    </div>
                    <GoogleLogo className="w-5 h-5 opacity-90" />
                  </div>
                  <div className="flex text-[#fbbc04] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-[#fbbc04]" : "text-gray-300"} />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 whitespace-normal">
                    "{review.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% - 1.5rem));
          }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
