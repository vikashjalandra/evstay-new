import React from 'react';
import { Globe, Mail, Phone, MapPin, ChevronDown } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#070e17] text-white py-16 px-6 md:px-12 font-sans border-t border-gray-900">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-2xl font-bold tracking-tight text-white sr-only">
              EV Stay
            </h3>
            <a href="/" className="flex items-center gap-2 group">
              <img src={'/images/evstay-logo-white.avif'} alt='evstay logo' className='w-32' />
            </a>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xs">
              Premium EV infrastructure for the hospitality industry. Elevating guest stays one charge at a time.
            </p>
            {/* Social / Action Circle Buttons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://dassgroup.in"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary-600 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="mailto:sales@evstay.in"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary-600 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                aria-label="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm sm:text-base font-light text-primary-400 tracking-wide uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="/" className="hover:text-primary-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-primary-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/partnerWithUs" className="hover:text-primary-400 transition-colors">
                  Partner With Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="https://www.dassgroup.in/career" className="hover:text-primary-400 transition-colors">
                  Career
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm sm:text-base font-light text-primary-400 tracking-wide uppercase">
              Legal
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="/privacy-policy" className="hover:text-primary-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="hover:text-primary-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-primary-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm sm:text-base font-light text-primary-400 tracking-wide uppercase">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <a href="mailto:sales@evstay.in" className="hover:text-primary-400 transition-colors">
                  sales@evstay.in
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <a href="tel:+917507245993" className="hover:text-primary-400 transition-colors">
                  +91 7507245993
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Office No 1, Pangare Building, Velu Phata, Velu, Pune
                  {/* Office 204, A Wing, City Vista, Kharadi, Pune, Maharashtra 411014 */}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Pure HTML Collapsible More Details Section */}
        <details className="group border-t border-gray-800/60 pt-6">
          <summary className="cursor-pointer list-none flex items-center justify-between text-xs font-light tracking-wide uppercase text-gray-400 hover:text-primary-400 transition-colors select-none py-2 border-t border-gray-800/60">
            <span>More Details</span>
            <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform duration-300" />
          </summary>
          <div className="pt-6 text-base text-gray-400 leading-relaxed space-y-4 max-w-6xl">
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EVSTAY: The Complete EV Charging Solution for Hotels, Resorts, Restaurants and Hospitality Businesses</h2>
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">EV Charging for Hotels Is Becoming the New Hospitality Essential</h3>
            <p className="leading-relaxed text-gray-400">The rise of electric vehicles is transforming the way people travel, stay and explore destinations, making <strong className="text-gray-300 font-medium">EV charging for hotels</strong> an increasingly important part of modern hospitality infrastructure.</p>
            <p className="leading-relaxed text-gray-400">For hotels, resorts, restaurants, lodges and highway properties, installing an <strong className="text-gray-300 font-medium">EV charging station</strong> is no longer simply about providing electricity to an electric car.</p>
            <p className="leading-relaxed text-gray-400">It is about creating a better guest experience, attracting EV travellers, increasing property value, generating additional revenue and preparing the business for the future of sustainable mobility.</p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">EVSTAY</strong> is designed around this exact opportunity.</p>
            <p className="leading-relaxed text-gray-400">EVSTAY provides an <strong className="text-gray-300 font-medium">end-to-end EV charging solution for the hospitality industry</strong>, helping properties introduce premium <a href="/" className="text-primary-400 hover:underline">EV charging infrastructure</a> without having to manage the complete technology, billing, installation and support ecosystem themselves.</p>
            <p className="leading-relaxed text-gray-400">From <strong className="text-gray-300 font-medium">hotel EV charging stations</strong> and <strong className="text-gray-300 font-medium">resort <a href="/" className="text-primary-400 hover:underline">EV charging infrastructure</a></strong> to fast charging solutions for restaurants and highway properties, EVSTAY brings together charging hardware, installation, cloud management, payments, monitoring, maintenance and revenue generation into one connected ecosystem.</p>
            <p className="leading-relaxed text-gray-400">For hospitality businesses looking to become <strong className="text-gray-300 font-medium">EV-ready</strong>, EVSTAY provides a practical way to turn parking spaces into valuable charging destinations.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">What Is EVSTAY?</h2>
            <p className="leading-relaxed text-gray-400">EVSTAY is an <strong className="text-gray-300 font-medium"><a href="/" className="text-primary-400 hover:underline">EV charging infrastructure</a> and charging management solution designed specifically for hospitality businesses</strong>.</p>
            <p className="leading-relaxed text-gray-400">Instead of treating an EV charger as a standalone electrical device, EVSTAY approaches charging as a complete hospitality service.</p>
            <p className="leading-relaxed text-gray-400">The platform is designed to help <strong className="text-gray-300 font-medium">hotels, resorts, restaurants, lodges and highway properties</strong> provide convenient EV charging to their guests and visitors.</p>
            <p className="leading-relaxed text-gray-400">The EVSTAY ecosystem can cover the complete journey from selecting an appropriate charging model to professional installation, commissioning, cloud management, payment collection, monitoring and ongoing support.</p>
            <p className="leading-relaxed text-gray-400">This makes EVSTAY an <strong className="text-gray-300 font-medium">end-to-end EV charging solution for hotels and hospitality properties</strong>.</p>
            <p className="leading-relaxed text-gray-400">The objective is simple: make EV charging convenient for the guest while keeping charging infrastructure easier to manage for the property.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">Why Hotels Need EV Charging Stations</h2>
            <p className="leading-relaxed text-gray-400">The hospitality industry is closely connected to travel.</p>
            <p className="leading-relaxed text-gray-400">As more travellers choose electric vehicles, hotels and resorts can become natural <strong className="text-gray-300 font-medium">destination charging locations</strong>.</p>
            <p className="leading-relaxed text-gray-400">A guest arriving at a hotel with an electric vehicle needs more than a parking space.</p>
            <p className="leading-relaxed text-gray-400">They need a convenient place where their vehicle can charge while they sleep, dine, relax or attend an event.</p>
            <p className="leading-relaxed text-gray-400">This creates a strong connection between <strong className="text-gray-300 font-medium">hotel stays and EV charging</strong>.</p>
            <p className="leading-relaxed text-gray-400">A hotel with <a href="/" className="text-primary-400 hover:underline">EV charging infrastructure</a> can provide an additional service that traditional hotels may not offer.</p>
            <p className="leading-relaxed text-gray-400">An EV charging station can therefore become part of the overall guest experience.</p>
            <p className="leading-relaxed text-gray-400">For hospitality businesses, the benefits can include:</p>
            <ul className="list-disc list-inside space-y-1.5 my-3 pl-2">
              <li><strong className="text-gray-300 font-medium">Attracting EV travellers</strong></li>
              <li><strong className="text-gray-300 font-medium">Improving guest experience</strong></li>
              <li><strong className="text-gray-300 font-medium">Creating additional charging revenue</strong></li>
              <li><strong className="text-gray-300 font-medium">Increasing property visibility</strong></li>
              <li><strong className="text-gray-300 font-medium">Supporting sustainability initiatives</strong></li>
              <li><strong className="text-gray-300 font-medium">Strengthening the property's green credentials</strong></li>
              <li><strong className="text-gray-300 font-medium">Preparing for future EV adoption</strong></li>
              <li><strong className="text-gray-300 font-medium">Creating a differentiated hospitality experience</strong></li>
            </ul>
            <p className="leading-relaxed text-gray-400">This is why <strong className="text-gray-300 font-medium">EV charging for hotels</strong> should be viewed as a hospitality investment rather than simply an electrical installation.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EV Charging for Hotels: Turning Parking Into an Opportunity</h2>
            <p className="leading-relaxed text-gray-400">Hotel parking areas are often underutilized assets.</p>
            <p className="leading-relaxed text-gray-400">With the right <strong className="text-gray-300 font-medium">hotel EV charging station</strong>, a designated parking space can become a useful destination charging point.</p>
            <p className="leading-relaxed text-gray-400">A guest can arrive at the hotel, park the vehicle, connect to the charger and continue enjoying their stay while the vehicle charges.</p>
            <p className="leading-relaxed text-gray-400">For overnight guests, AC destination charging can be particularly suitable because the vehicle remains parked for several hours.</p>
            <p className="leading-relaxed text-gray-400">EVSTAY's <strong className="text-gray-300 font-medium">Elite Destination</strong> model is designed around this long-stay hospitality use case.</p>
            <p className="leading-relaxed text-gray-400">The solution provides charging of up to <strong className="text-gray-300 font-medium">22 kW</strong> and is designed for hotels and resorts where guests may remain parked for extended periods.</p>
            <p className="leading-relaxed text-gray-400">The charger is also specified with an <strong className="text-gray-300 font-medium">IP65 weatherproof rating</strong>, making it suitable for outdoor charging environments when the installation is appropriately designed.</p>
            <p className="leading-relaxed text-gray-400">This approach allows hotels to integrate EV charging into their existing hospitality environment.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EV Charging Solutions for Resorts</h2>
            <p className="leading-relaxed text-gray-400">Resorts provide another important use case for <strong className="text-gray-300 font-medium">destination EV charging</strong>.</p>
            <p className="leading-relaxed text-gray-400">Unlike traditional fuel stops, resorts can provide charging while the guest is already spending time at the property.</p>
            <p className="leading-relaxed text-gray-400">A resort guest may spend several hours or an entire night at the location.</p>
            <p className="leading-relaxed text-gray-400">During this time, their electric vehicle can be connected to an EV charging station.</p>
            <p className="leading-relaxed text-gray-400">This creates a natural combination of:</p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">Travel + Hospitality + Parking + EV Charging + Guest Experience.</strong></p>
            <p className="leading-relaxed text-gray-400">For resorts that want to attract environmentally conscious travellers, an <strong className="text-gray-300 font-medium">EV charging station for resorts</strong> can become an important differentiating facility.</p>
            <p className="leading-relaxed text-gray-400">EVSTAY helps resorts introduce <a href="/" className="text-primary-400 hover:underline">EV charging infrastructure</a> while supporting the operational requirements associated with charging management.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EV Charging for Restaurants and Cafés</h2>
            <p className="leading-relaxed text-gray-400">EV charging is not limited to hotels and resorts.</p>
            <p className="leading-relaxed text-gray-400">Restaurants and cafés can also become valuable EV charging destinations.</p>
            <p className="leading-relaxed text-gray-400">For a restaurant customer, charging time can overlap naturally with dining time.</p>
            <p className="leading-relaxed text-gray-400">A driver can park, connect the EV to the charging station, enjoy a meal and return to a partially or significantly charged vehicle.</p>
            <p className="leading-relaxed text-gray-400">EVSTAY's <strong className="text-gray-300 font-medium">Swift Connect</strong> model is designed for use cases such as restaurants and cafés where faster charging can complement shorter customer visits.</p>
            <p className="leading-relaxed text-gray-400">The website describes Swift Connect as supporting charging speeds of up to <strong className="text-gray-300 font-medium">60 kW</strong>.</p>
            <p className="leading-relaxed text-gray-400">This creates a potential business model where the restaurant does not simply provide food and beverages but also provides an additional service to EV drivers.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EV Charging Stations for Highway Properties</h2>
            <p className="leading-relaxed text-gray-400">Highway properties have a different charging requirement.</p>
            <p className="leading-relaxed text-gray-400">Drivers travelling long distances generally need faster charging compared with overnight hotel guests.</p>
            <p className="leading-relaxed text-gray-400">This makes high-output <strong className="text-gray-300 font-medium">DC <a href="/" className="text-primary-400 hover:underline">EV charging infrastructure</a></strong> particularly relevant for highway locations and transit-oriented properties.</p>
            <p className="leading-relaxed text-gray-400">EVSTAY's <strong className="text-gray-300 font-medium">Hyper Hub</strong> model is designed for high-output charging at highway transit properties.</p>
            <p className="leading-relaxed text-gray-400">The website lists Hyper Hub with charging speeds of up to <strong className="text-gray-300 font-medium">150 kW</strong>.</p>
            <p className="leading-relaxed text-gray-400">Highway EV charging can therefore help create a dedicated destination for electric vehicle travellers who need to recharge during long-distance journeys.</p>
            <p className="leading-relaxed text-gray-400">For highway hotels, restaurants, cafés and other roadside properties, combining EV charging with existing hospitality services can create a stronger destination proposition.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EVSTAY's Three Charging Models</h2>
            <p className="leading-relaxed text-gray-400">EVSTAY provides multiple charging models designed around different hospitality and travel environments.</p>
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">1. Elite Destination Charging</h3>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">Elite Destination</strong> is designed for hotels and resorts with overnight or long-stay guests.</p>
            <p className="leading-relaxed text-gray-400">The solution provides charging of up to <strong className="text-gray-300 font-medium">22 kW</strong>.</p>
            <p className="leading-relaxed text-gray-400">The model focuses on destination charging where the vehicle can remain parked for a longer period.</p>
            <p className="leading-relaxed text-gray-400">This makes it suitable for:</p>
            <ul className="list-disc list-inside space-y-1.5 my-3 pl-2">
              <li>Hotels</li>
              <li>Resorts</li>
              <li>Luxury hospitality properties</li>
              <li>Long-stay accommodation</li>
              <li>Destination properties</li>
            </ul>
            <p className="leading-relaxed text-gray-400">The charging infrastructure is designed to complement the aesthetics of premium hospitality environments.</p>
            <hr className="border-gray-800/80 my-6" />
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">2. Swift Connect</h3>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">Swift Connect</strong> is designed for restaurants and cafés where customers may spend a shorter amount of time at the property.</p>
            <p className="leading-relaxed text-gray-400">The model supports charging of up to <strong className="text-gray-300 font-medium">60 kW</strong> according to EVSTAY's website.</p>
            <p className="leading-relaxed text-gray-400">The objective is to combine a faster EV charging experience with customer visits.</p>
            <p className="leading-relaxed text-gray-400">This can be useful for:</p>
            <ul className="list-disc list-inside space-y-1.5 my-3 pl-2">
              <li>Restaurants</li>
              <li>Cafés</li>
              <li>Food courts</li>
              <li>Hospitality destinations</li>
              <li>Short-duration stops</li>
            </ul>
            <p className="leading-relaxed text-gray-400">By providing EV charging, businesses can create another reason for EV drivers to choose their property.</p>
            <hr className="border-gray-800/80 my-6" />
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">3. Hyper Hub</h3>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">Hyper Hub</strong> is designed for high-output charging requirements.</p>
            <p className="leading-relaxed text-gray-400">With charging speeds listed up to <strong className="text-gray-300 font-medium">150 kW</strong>, it is intended for highway transit properties and locations where drivers need faster charging.</p>
            <p className="leading-relaxed text-gray-400">Potential locations include:</p>
            <ul className="list-disc list-inside space-y-1.5 my-3 pl-2">
              <li>Highway properties</li>
              <li>Transit hubs</li>
              <li>Roadside hospitality destinations</li>
              <li>High-traffic travel corridors</li>
            </ul>
            <p className="leading-relaxed text-gray-400">High-speed EV charging can play an important role in supporting long-distance electric vehicle travel.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">What Makes EVSTAY an End-to-End EV Charging Solution?</h2>
            <p className="leading-relaxed text-gray-400">Many businesses think of an EV charging project as simply purchasing a charger.</p>
            <p className="leading-relaxed text-gray-400">However, a complete <strong className="text-gray-300 font-medium"><a href="/" className="text-primary-400 hover:underline">EV charging infrastructure</a> solution</strong> involves much more than hardware.</p>
            <p className="leading-relaxed text-gray-400">A successful charging network can require:</p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">Site assessment → Electrical planning → Charger installation → Commissioning → Software → Payments → Monitoring → Maintenance → Customer support → Revenue management.</strong></p>
            <p className="leading-relaxed text-gray-400">EVSTAY is designed to bring these elements together.</p>
            <p className="leading-relaxed text-gray-400">The platform describes itself as an <strong className="text-gray-300 font-medium">end-to-end charging ecosystem for the hospitality sector</strong>.</p>
            <p className="leading-relaxed text-gray-400">This means hospitality businesses can focus on their property and guests while the charging ecosystem handles the technology and operational layer.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EV Charging Hardware</h2>
            <p className="leading-relaxed text-gray-400">The physical charger is one of the most visible components of an EV charging installation.</p>
            <p className="leading-relaxed text-gray-400">However, hospitality properties also need charging equipment that fits their environment.</p>
            <p className="leading-relaxed text-gray-400">A charger located outside a luxury hotel needs to work reliably while also fitting into the property's overall visual experience.</p>
            <p className="leading-relaxed text-gray-400">EVSTAY focuses on <strong className="text-gray-300 font-medium">premium EV charging hardware</strong> designed to complement hospitality environments.</p>
            <p className="leading-relaxed text-gray-400">Depending on the selected model, charging capabilities can range from destination AC charging to higher-output charging.</p>
            <p className="leading-relaxed text-gray-400">The right hardware depends on:</p>
            <ul className="list-disc list-inside space-y-1.5 my-3 pl-2">
              <li>Property type</li>
              <li>Parking duration</li>
              <li>Available electrical capacity</li>
              <li>Expected charging demand</li>
              <li>Number of chargers</li>
              <li>Guest requirements</li>
              <li>Site infrastructure</li>
            </ul>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">Professional EV Charger Installation</h2>
            <p className="leading-relaxed text-gray-400">Installing an EV charger is more than mounting equipment on a wall.</p>
            <p className="leading-relaxed text-gray-400">A proper <strong className="text-gray-300 font-medium"><a href="/#how-to-use" className="text-primary-400 hover:underline">EV charging station installation</a></strong> can require electrical assessment, power availability checks, cable routing, protection systems, civil work and commissioning.</p>
            <p className="leading-relaxed text-gray-400">EVSTAY's onboarding process includes a professional setup stage.</p>
            <p className="leading-relaxed text-gray-400">According to the website, its engineering team handles:</p>
            <ul className="list-disc list-inside space-y-1.5 my-3 pl-2">
              <li>Site survey</li>
              <li>Electrical work</li>
              <li>Installation</li>
              <li>Commissioning</li>
            </ul>
            <p className="leading-relaxed text-gray-400">This creates a structured process for hospitality properties that want to introduce EV charging without independently coordinating every technical requirement.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EV Charging Management Software</h2>
            <p className="leading-relaxed text-gray-400">Modern <a href="/" className="text-primary-400 hover:underline">EV charging infrastructure</a> needs software as much as it needs hardware.</p>
            <p className="leading-relaxed text-gray-400">A charger without proper management capabilities can become difficult to monitor and operate at scale.</p>
            <p className="leading-relaxed text-gray-400">EVSTAY provides <strong className="text-gray-300 font-medium">OCPP-compliant cloud management software</strong> as part of its charging ecosystem.</p>
            <p className="leading-relaxed text-gray-400">Cloud-based EV charging management can help operators manage charging infrastructure remotely.</p>
            <p className="leading-relaxed text-gray-400">It can also support functions related to:</p>
            <ul className="list-disc list-inside space-y-1.5 my-3 pl-2">
              <li>Charging sessions</li>
              <li>Usage monitoring</li>
              <li>Billing</li>
              <li>Payments</li>
              <li>Support</li>
              <li>Operational visibility</li>
            </ul>
            <p className="leading-relaxed text-gray-400">For businesses operating multiple charging stations or multiple properties, centralized charging management can become especially valuable.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EV Charging Payments</h2>
            <p className="leading-relaxed text-gray-400">One of the most important components of a commercial EV charging station is payment management.</p>
            <p className="leading-relaxed text-gray-400">EV drivers expect convenient ways to start and pay for charging sessions.</p>
            <p className="leading-relaxed text-gray-400">EVSTAY's website states that its smart charging stations support payment methods including:</p>
            <ul className="list-disc list-inside space-y-1.5 my-3 pl-2">
              <li>Credit cards</li>
              <li>Debit cards</li>
              <li>Mobile wallets</li>
              <li>RFID access tags</li>
              <li>Mobile web experience</li>
              <li>App-based access</li>
            </ul>
            <p className="leading-relaxed text-gray-400">This gives hospitality businesses flexibility in how they provide paid EV charging services.</p>
            <p className="leading-relaxed text-gray-400">A property can potentially offer charging as a paid service instead of treating electricity consumption as an unmanaged operational expense.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EV Charging Revenue Generation</h2>
            <p className="leading-relaxed text-gray-400"><a href="/" className="text-primary-400 hover:underline">EV charging infrastructure</a> can create an additional revenue opportunity for hospitality businesses.</p>
            <p className="leading-relaxed text-gray-400">Instead of providing charging entirely as a free facility, properties can monetize charging sessions using flexible pricing models.</p>
            <p className="leading-relaxed text-gray-400">EVSTAY highlights <strong className="text-gray-300 font-medium">revenue generation through charging sessions</strong> as one of the reasons hospitality leaders can choose its platform.</p>
            <p className="leading-relaxed text-gray-400">This creates a potential business equation:</p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">Hotel Parking + EV Charger + Charging Demand = Additional Revenue Opportunity.</strong></p>
            <p className="leading-relaxed text-gray-400">The exact commercial model can depend on the property, electricity costs, charging utilization and partnership structure.</p>
            <p className="leading-relaxed text-gray-400">The goal is to transform EV charging from a pure expense into a managed hospitality service with potential revenue generation.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">Automated Billing for EV Charging</h2>
            <p className="leading-relaxed text-gray-400">Managing electricity billing can become complicated when EV charging stations are installed at commercial properties.</p>
            <p className="leading-relaxed text-gray-400">The property may need to understand:</p>
            <ul className="list-disc list-inside space-y-1.5 my-3 pl-2">
              <li>How much electricity was consumed</li>
              <li>Which charging sessions occurred</li>
              <li>How much the guest paid</li>
              <li>How utility costs are handled</li>
              <li>How revenue is distributed</li>
            </ul>
            <p className="leading-relaxed text-gray-400">EVSTAY states that it offers flexible business models for electricity billing.</p>
            <p className="leading-relaxed text-gray-400">Depending on the selected model, EVSTAY can handle automated guest billing and utility reimbursements to the property account or integrate with a property's PMS.</p>
            <p className="leading-relaxed text-gray-400">This can help reduce administrative complexity for hospitality operators.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">Zero Management Overhead for Hospitality Properties</h2>
            <p className="leading-relaxed text-gray-400">One of the key propositions of EVSTAY is reducing the management burden associated with EV charging.</p>
            <p className="leading-relaxed text-gray-400">The platform states that its cloud platform manages billing and support.</p>
            <p className="leading-relaxed text-gray-400">This means the hospitality property does not necessarily need to build its own EV charging operations team.</p>
            <p className="leading-relaxed text-gray-400">Instead, the charging infrastructure can operate as an integrated service.</p>
            <p className="leading-relaxed text-gray-400">For hotel owners and property managers, this can make EV charging easier to adopt.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">24/7 EV Charging Monitoring and Support</h2>
            <p className="leading-relaxed text-gray-400"><a href="/" className="text-primary-400 hover:underline">EV charging infrastructure</a> needs ongoing operational support.</p>
            <p className="leading-relaxed text-gray-400">A charger being installed is only the beginning.</p>
            <p className="leading-relaxed text-gray-400">Guests may experience issues related to:</p>
            <ul className="list-disc list-inside space-y-1.5 my-3 pl-2">
              <li>Starting a charging session</li>
              <li>Payment</li>
              <li>Connectivity</li>
              <li>Charging status</li>
              <li>Vehicle compatibility</li>
              <li>Hardware operation</li>
            </ul>
            <p className="leading-relaxed text-gray-400">EVSTAY provides <strong className="text-gray-300 font-medium">24/7 monitoring and support</strong> as part of its offering.</p>
            <p className="leading-relaxed text-gray-400">The company states that maintenance and guest troubleshooting are handled by its experts.</p>
            <p className="leading-relaxed text-gray-400">For hospitality businesses, this can help maintain a more reliable guest experience.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EV Charging and Guest Experience</h2>
            <p className="leading-relaxed text-gray-400">Hospitality is fundamentally about experience.</p>
            <p className="leading-relaxed text-gray-400">An EV driver arriving at a hotel does not want to think about whether charging will be available.</p>
            <p className="leading-relaxed text-gray-400">They want charging to be simple.</p>
            <p className="leading-relaxed text-gray-400">They want to park.</p>
            <p className="leading-relaxed text-gray-400">They want to connect their vehicle.</p>
            <p className="leading-relaxed text-gray-400">They want to start charging.</p>
            <p className="leading-relaxed text-gray-400">They want to enjoy their stay.</p>
            <p className="leading-relaxed text-gray-400">And they want to return to a charged vehicle.</p>
            <p className="leading-relaxed text-gray-400">This makes <strong className="text-gray-300 font-medium">EV charging for hotels</strong> more than an infrastructure feature.</p>
            <p className="leading-relaxed text-gray-400">It becomes part of the guest journey.</p>
            <p className="leading-relaxed text-gray-400">A well-designed charging experience can therefore contribute to guest satisfaction and property differentiation.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">Attract More EV Travellers</h2>
            <p className="leading-relaxed text-gray-400">EV owners increasingly plan journeys around charging availability.</p>
            <p className="leading-relaxed text-gray-400">A property offering reliable EV charging can therefore become more attractive to EV travellers.</p>
            <p className="leading-relaxed text-gray-400">EVSTAY positions charging infrastructure as a way for hospitality businesses to reach the growing segment of EV travellers.</p>
            <p className="leading-relaxed text-gray-400">Visibility within an EV charging network can potentially help drivers discover properties that provide charging facilities.</p>
            <p className="leading-relaxed text-gray-400">This creates a new connection between:</p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">EV charging network visibility + hotel discovery + travel planning.</strong></p>
            <p className="leading-relaxed text-gray-400">For hotels and resorts competing for travellers, EV charging can become another point of differentiation.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EV Charging and Sustainable Hospitality</h2>
            <p className="leading-relaxed text-gray-400">Sustainability is becoming increasingly important in hospitality.</p>
            <p className="leading-relaxed text-gray-400">Hotels, resorts and tourism businesses are looking for ways to reduce environmental impact and improve their sustainability positioning.</p>
            <p className="leading-relaxed text-gray-400"><a href="/" className="text-primary-400 hover:underline">EV charging infrastructure</a> supports the transition toward electric mobility.</p>
            <p className="leading-relaxed text-gray-400">EVSTAY highlights <strong className="text-gray-300 font-medium">ESG compliance and green certification goals</strong> among the potential benefits of <a href="/" className="text-primary-400 hover:underline">EV charging infrastructure</a> for hospitality properties.</p>
            <p className="leading-relaxed text-gray-400">Although EV charging alone does not make a property fully sustainable, it can become one component of a broader sustainability strategy.</p>
            <p className="leading-relaxed text-gray-400">A hospitality property can combine EV charging with:</p>
            <ul className="list-disc list-inside space-y-1.5 my-3 pl-2">
              <li>Renewable energy</li>
              <li>Energy-efficient lighting</li>
              <li>Smart energy management</li>
              <li>Water conservation</li>
              <li>Sustainable building practices</li>
              <li>Waste reduction</li>
              <li>Green transportation initiatives</li>
            </ul>
            <p className="leading-relaxed text-gray-400">This can create a more comprehensive sustainable hospitality strategy.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EV Charging Infrastructure for Luxury Hotels</h2>
            <p className="leading-relaxed text-gray-400">Luxury hotels have a unique opportunity to integrate EV charging into premium guest services.</p>
            <p className="leading-relaxed text-gray-400">For a luxury hotel, charging infrastructure should not look like an afterthought.</p>
            <p className="leading-relaxed text-gray-400">It should feel like part of the property's overall infrastructure.</p>
            <p className="leading-relaxed text-gray-400">EVSTAY focuses on premium charging hardware and hospitality-oriented deployment.</p>
            <p className="leading-relaxed text-gray-400">A luxury hotel can potentially position EV charging alongside services such as:</p>
            <ul className="list-disc list-inside space-y-1.5 my-3 pl-2">
              <li>Valet parking</li>
              <li>Premium parking</li>
              <li>Concierge services</li>
              <li>Airport transfers</li>
              <li>Business facilities</li>
              <li>Sustainable amenities</li>
            </ul>
            <p className="leading-relaxed text-gray-400">This creates a premium <strong className="text-gray-300 font-medium">EV-friendly hotel experience</strong>.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EV Charging Infrastructure for Boutique Hotels</h2>
            <p className="leading-relaxed text-gray-400">Boutique hotels can also benefit from EV charging.</p>
            <p className="leading-relaxed text-gray-400">A smaller property does not necessarily need a large charging hub.</p>
            <p className="leading-relaxed text-gray-400">Instead, it may benefit from one or more appropriately sized destination chargers.</p>
            <p className="leading-relaxed text-gray-400">A boutique hotel can use EV charging as a differentiation strategy.</p>
            <p className="leading-relaxed text-gray-400">Instead of competing only on rooms, location and hospitality, the property can also promote itself as an <strong className="text-gray-300 font-medium">EV-friendly accommodation option</strong>.</p>
            <p className="leading-relaxed text-gray-400">This can be especially relevant for road-trip travellers and environmentally conscious guests.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EV Charging for Resorts and Holiday Destinations</h2>
            <p className="leading-relaxed text-gray-400">Resorts are natural destinations for EV charging.</p>
            <p className="leading-relaxed text-gray-400">Guests often spend extended periods at resorts, making destination charging particularly relevant.</p>
            <p className="leading-relaxed text-gray-400">While guests enjoy:</p>
            <ul className="list-disc list-inside space-y-1.5 my-3 pl-2">
              <li>Restaurants</li>
              <li>Swimming pools</li>
              <li>Spa services</li>
              <li>Meetings</li>
              <li>Activities</li>
              <li>Accommodation</li>
            </ul>
            <p className="leading-relaxed text-gray-400">their vehicle can remain connected to an EV charger.</p>
            <p className="leading-relaxed text-gray-400">This makes resort charging an example of <strong className="text-gray-300 font-medium">destination EV charging</strong>.</p>
            <p className="leading-relaxed text-gray-400">Instead of asking guests to make a separate trip to a charging station, the charging station comes to the destination where they already want to spend time.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EV Charging for Highway Hotels</h2>
            <p className="leading-relaxed text-gray-400">Highway hotels can play an important role in electric road travel.</p>
            <p className="leading-relaxed text-gray-400">Long-distance EV drivers need charging locations along their route.</p>
            <p className="leading-relaxed text-gray-400">A highway hotel equipped with fast EV charging can provide both:</p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">Vehicle charging + Human hospitality.</strong></p>
            <p className="leading-relaxed text-gray-400">The driver can charge the vehicle while taking a break, eating, resting or staying overnight.</p>
            <p className="leading-relaxed text-gray-400">This creates an opportunity for highway properties to become <strong className="text-gray-300 font-medium">EV travel destinations</strong> rather than simply roadside stops.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EV Charging for Restaurants</h2>
            <p className="leading-relaxed text-gray-400">Restaurants can use EV charging to increase the value of a customer visit.</p>
            <p className="leading-relaxed text-gray-400">An EV driver looking for a charging station may choose a restaurant where they can charge while eating.</p>
            <p className="leading-relaxed text-gray-400">The charging station can therefore become a customer acquisition channel.</p>
            <p className="leading-relaxed text-gray-400">This creates an interesting relationship:</p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">EV Charging → Customer Stop → Restaurant Visit → Food & Beverage Revenue.</strong></p>
            <p className="leading-relaxed text-gray-400">For restaurants located on highways or major travel routes, this opportunity can be even more significant.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EV Charging for Corporate Hospitality Properties</h2>
            <p className="leading-relaxed text-gray-400">Corporate hotels and business destinations can also benefit from <a href="/" className="text-primary-400 hover:underline">EV charging infrastructure</a>.</p>
            <p className="leading-relaxed text-gray-400">Business travellers increasingly use electric vehicles.</p>
            <p className="leading-relaxed text-gray-400">Providing EV charging can support corporate sustainability initiatives while improving convenience for employees, clients and guests.</p>
            <p className="leading-relaxed text-gray-400">Conference hotels can also use EV charging as part of their broader sustainable-event offering.</p>
            <p className="leading-relaxed text-gray-400">This can make the property more attractive for organizations with sustainability-focused travel policies.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">How Does EVSTAY Work?</h2>
            <p className="leading-relaxed text-gray-400">The EVSTAY onboarding process is designed around three major steps.</p>
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">Step 1: Choose Your EV Charging Model</h3>
            <p className="leading-relaxed text-gray-400">The first step is selecting the charging model appropriate for the property.</p>
            <p className="leading-relaxed text-gray-400">The choice can depend on whether the location is:</p>
            <ul className="list-disc list-inside space-y-1.5 my-3 pl-2">
              <li>A hotel</li>
              <li>A resort</li>
              <li>A restaurant</li>
              <li>A café</li>
              <li>A highway property</li>
              <li>A transit-oriented location</li>
            </ul>
            <p className="leading-relaxed text-gray-400">EVSTAY can help determine the appropriate hardware and partnership model.</p>
            <hr className="border-gray-800/80 my-6" />
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">Step 2: Professional EV Charger Setup</h3>
            <p className="leading-relaxed text-gray-400">After selecting the model, the installation process begins.</p>
            <p className="leading-relaxed text-gray-400">The website describes a professional setup process involving site survey, electrical work and installation by its engineering team.</p>
            <p className="leading-relaxed text-gray-400">This allows the charging infrastructure to be integrated into the property's existing environment.</p>
            <hr className="border-gray-800/80 my-6" />
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">Step 3: Go Live and Start Earning</h3>
            <p className="leading-relaxed text-gray-400">Once the charging station is installed and commissioned, the property can make the charger available to users.</p>
            <p className="leading-relaxed text-gray-400">EVSTAY's partner dashboard provides usage monitoring and revenue-related visibility.</p>
            <p className="leading-relaxed text-gray-400">This creates the complete journey:</p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">Select → Install → Launch → Monitor → Monetize.</strong></p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">What EVSTAY Provides</h2>
            <p className="leading-relaxed text-gray-400">EVSTAY's hospitality EV charging ecosystem includes several components.</p>
            <h4 className="text-sm font-medium text-white mt-5 mb-2">Premium Fast Charging Hardware</h4>
            <p className="leading-relaxed text-gray-400">EVSTAY provides charging hardware designed for hospitality and destination charging environments.</p>
            <h4 className="text-sm font-medium text-white mt-5 mb-2">End-to-End Installation and Commissioning</h4>
            <p className="leading-relaxed text-gray-400">The company handles the installation process through its engineering setup.</p>
            <h4 className="text-sm font-medium text-white mt-5 mb-2">OCPP-Compliant Cloud Management Software</h4>
            <p className="leading-relaxed text-gray-400">The cloud platform provides centralized charging management capabilities.</p>
            <h4 className="text-sm font-medium text-white mt-5 mb-2">24/7 Monitoring and Support</h4>
            <p className="leading-relaxed text-gray-400">EVSTAY provides ongoing monitoring and support for charging infrastructure and guest troubleshooting.</p>
            <p className="leading-relaxed text-gray-400">Together, these components form a complete <strong className="text-gray-300 font-medium">commercial EV charging solution</strong>.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">What Does the Property Need to Provide?</h2>
            <p className="leading-relaxed text-gray-400">The EVSTAY partnership model also defines responsibilities for the hospitality property.</p>
            <p className="leading-relaxed text-gray-400">The partner provides:</p>
            <ul className="list-disc list-inside space-y-1.5 my-3 pl-2">
              <li>Designated parking space</li>
              <li>Power connection point</li>
              <li>On-ground physical security</li>
              <li>Basic site housekeeping</li>
            </ul>
            <p className="leading-relaxed text-gray-400">This creates a clear division between the charging technology provider and the property.</p>
            <p className="leading-relaxed text-gray-400">Such clarity can make EV charger deployment easier for hotels and resorts.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EVSTAY vs a Standalone EV Charger</h2>
            <p className="leading-relaxed text-gray-400">A standalone EV charger provides electricity.</p>
            <p className="leading-relaxed text-gray-400">An EV charging ecosystem provides much more.</p>
            <p className="leading-relaxed text-gray-400">A standalone charger may require the property to independently manage:</p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">Hardware + Installation + Software + Payments + Monitoring + Maintenance + Customer Support.</strong></p>
            <p className="leading-relaxed text-gray-400">An end-to-end platform such as EVSTAY is designed to bring these components together.</p>
            <p className="leading-relaxed text-gray-400">This distinction is particularly important for hotels and resorts.</p>
            <p className="leading-relaxed text-gray-400">Hospitality companies are experts in hospitality.</p>
            <p className="leading-relaxed text-gray-400">They should not necessarily have to become EV charging technology operators.</p>
            <p className="leading-relaxed text-gray-400">That is where a specialized <strong className="text-gray-300 font-medium">hospitality EV charging platform</strong> can create value.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">Why Destination Charging Matters</h2>
            <p className="leading-relaxed text-gray-400">Destination charging is fundamentally different from traditional fuel station charging.</p>
            <p className="leading-relaxed text-gray-400">Fuel stations are designed around a short stop.</p>
            <p className="leading-relaxed text-gray-400">Destination charging works around the destination itself.</p>
            <p className="leading-relaxed text-gray-400">A hotel can charge while the guest sleeps.</p>
            <p className="leading-relaxed text-gray-400">A restaurant can charge while the customer eats.</p>
            <p className="leading-relaxed text-gray-400">A resort can charge while the guest enjoys the property.</p>
            <p className="leading-relaxed text-gray-400">A highway hotel can charge while the traveller rests.</p>
            <p className="leading-relaxed text-gray-400">This makes <strong className="text-gray-300 font-medium">destination EV charging</strong> especially relevant to hospitality.</p>
            <p className="leading-relaxed text-gray-400">The charging session becomes part of the user's existing activity instead of requiring a separate activity.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">The Future of EV Charging in Hospitality</h2>
            <p className="leading-relaxed text-gray-400">The hospitality industry is moving toward a more connected and sustainable travel ecosystem.</p>
            <p className="leading-relaxed text-gray-400">Hotels will increasingly need to think about how guests arrive, where they park and how they recharge.</p>
            <p className="leading-relaxed text-gray-400"><a href="/" className="text-primary-400 hover:underline">EV charging infrastructure</a> can become part of this future.</p>
            <p className="leading-relaxed text-gray-400">The hotel of the future may not simply provide:</p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">Room + Food + Parking.</strong></p>
            <p className="leading-relaxed text-gray-400">It may provide:</p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">Room + Food + Parking + EV Charging + Digital Services + Sustainable Mobility.</strong></p>
            <p className="leading-relaxed text-gray-400">This is the opportunity EVSTAY is designed to address.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EV Charging as a Competitive Advantage for Hotels</h2>
            <p className="leading-relaxed text-gray-400">Hospitality is a competitive industry.</p>
            <p className="leading-relaxed text-gray-400">Hotels compete based on:</p>
            <ul className="list-disc list-inside space-y-1.5 my-3 pl-2">
              <li>Location</li>
              <li>Price</li>
              <li>Service</li>
              <li>Amenities</li>
              <li>Experience</li>
              <li>Convenience</li>
              <li>Sustainability</li>
            </ul>
            <p className="leading-relaxed text-gray-400">EV charging adds another potential differentiator.</p>
            <p className="leading-relaxed text-gray-400">An EV driver searching for a hotel may specifically look for properties with charging facilities.</p>
            <p className="leading-relaxed text-gray-400">Therefore, <strong className="text-gray-300 font-medium">EV charging stations for hotels</strong> can become part of the property's marketing proposition.</p>
            <p className="leading-relaxed text-gray-400">Instead of simply saying:</p>
            <p className="leading-relaxed text-gray-400">"Free Parking Available"</p>
            <p className="leading-relaxed text-gray-400">a property can potentially promote:</p>
            <p className="leading-relaxed text-gray-400">"EV Charging Available."</p>
            <p className="leading-relaxed text-gray-400">That small difference can influence the decision of an EV traveller.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">How EV Charging Can Increase Property Value</h2>
            <p className="leading-relaxed text-gray-400">Modern infrastructure can contribute to the perceived value of a hospitality property.</p>
            <p className="leading-relaxed text-gray-400">EV charging demonstrates that a property is prepared for changing transportation patterns.</p>
            <p className="leading-relaxed text-gray-400">It can support:</p>
            <ul className="list-disc list-inside space-y-1.5 my-3 pl-2">
              <li>Future readiness</li>
              <li>Sustainability positioning</li>
              <li>Guest convenience</li>
              <li>Additional services</li>
              <li>Potential revenue generation</li>
              <li>Differentiation</li>
            </ul>
            <p className="leading-relaxed text-gray-400">For property owners planning long-term investments, <a href="/" className="text-primary-400 hover:underline">EV charging infrastructure</a> can therefore be considered part of future-ready hospitality infrastructure.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EVSTAY for Hotel Owners</h2>
            <p className="leading-relaxed text-gray-400">Hotel owners looking for an <strong className="text-gray-300 font-medium">EV charging solution for hotels</strong> can use EVSTAY to explore a complete charging partnership.</p>
            <p className="leading-relaxed text-gray-400">Instead of purchasing equipment and managing the complete charging ecosystem independently, owners can work with a specialized platform.</p>
            <p className="leading-relaxed text-gray-400">EVSTAY can support the journey from site assessment through installation, charging management and ongoing support.</p>
            <p className="leading-relaxed text-gray-400">This allows hotel owners to focus on their core business while adding EV charging as a new property service.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EVSTAY for Resort Owners</h2>
            <p className="leading-relaxed text-gray-400">Resort owners can use <a href="/" className="text-primary-400 hover:underline">EV charging infrastructure</a> to enhance the guest experience and support sustainable travel.</p>
            <p className="leading-relaxed text-gray-400">A resort EV charging station can provide convenience to guests arriving in electric cars.</p>
            <p className="leading-relaxed text-gray-400">For long-stay guests, destination charging can be especially useful.</p>
            <p className="leading-relaxed text-gray-400">For resorts located along popular travel routes, EV charging can also help attract new visitors.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EVSTAY for Restaurant Owners</h2>
            <p className="leading-relaxed text-gray-400">Restaurant owners can consider EV charging as an additional customer attraction strategy.</p>
            <p className="leading-relaxed text-gray-400">A driver who needs to charge an EV needs somewhere to spend charging time.</p>
            <p className="leading-relaxed text-gray-400">A restaurant can become that destination.</p>
            <p className="leading-relaxed text-gray-400">With the right charging model, the charging experience and dining experience can complement each other.</p>
            <p className="leading-relaxed text-gray-400">This can create a potential new customer acquisition channel for restaurants and cafés.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EVSTAY for Highway Property Owners</h2>
            <p className="leading-relaxed text-gray-400">Highway property owners can consider high-output charging infrastructure for long-distance EV travellers.</p>
            <p className="leading-relaxed text-gray-400">EVSTAY's Hyper Hub model is designed around high-output charging and highway transit properties.</p>
            <p className="leading-relaxed text-gray-400">This can help highway businesses position themselves as EV-ready travel destinations.</p>
            <p className="leading-relaxed text-gray-400">As electric road travel expands, strategically located fast-charging infrastructure can become increasingly important.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EVSTAY and the Future of Sustainable Travel</h2>
            <p className="leading-relaxed text-gray-400">Electric vehicles are changing transportation.</p>
            <p className="leading-relaxed text-gray-400">Hospitality businesses are part of the travel ecosystem.</p>
            <p className="leading-relaxed text-gray-400">When these two industries come together, EV charging becomes a natural bridge between mobility and hospitality.</p>
            <p className="leading-relaxed text-gray-400">A guest drives an EV.</p>
            <p className="leading-relaxed text-gray-400">The guest needs charging.</p>
            <p className="leading-relaxed text-gray-400">The guest chooses a hotel, resort, restaurant or highway property that provides charging.</p>
            <p className="leading-relaxed text-gray-400">The property provides a better experience.</p>
            <p className="leading-relaxed text-gray-400">The charging infrastructure creates another service and potential revenue opportunity.</p>
            <p className="leading-relaxed text-gray-400">This is the foundation of <strong className="text-gray-300 font-medium">EV charging for hospitality</strong>.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">Frequently Asked Questions About EV Charging for Hotels</h2>
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">What is an EV charging station for hotels?</h3>
            <p className="leading-relaxed text-gray-400">An EV charging station for hotels is charging infrastructure installed at a hotel property so guests and visitors can recharge electric vehicles while staying or visiting the property.</p>
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">Why should hotels install EV chargers?</h3>
            <p className="leading-relaxed text-gray-400">Hotels can install EV chargers to improve guest convenience, attract EV travellers, support sustainability initiatives, differentiate their property and potentially generate revenue from charging sessions.</p>
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">What type of EV charger is suitable for hotels?</h3>
            <p className="leading-relaxed text-gray-400">The appropriate charger depends on the property's electrical capacity, parking duration, expected usage and business model. Destination AC charging can be suitable for overnight stays, while faster charging can be useful for shorter visits.</p>
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">What is destination EV charging?</h3>
            <p className="leading-relaxed text-gray-400"><a href="/#solutions" className="text-primary-400 hover:underline">Destination EV charging</a> allows an electric vehicle to charge at a location where the driver is already spending time, such as a hotel, resort, restaurant or shopping destination.</p>
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">Can resorts install EV charging stations?</h3>
            <p className="leading-relaxed text-gray-400">Yes. Resorts are particularly suitable for destination EV charging because guests often remain at the property for several hours or overnight.</p>
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">Can restaurants provide EV charging?</h3>
            <p className="leading-relaxed text-gray-400">Yes. Restaurants can use EV charging to provide an additional service to customers and potentially attract EV drivers who want to charge while dining.</p>
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">Can highway hotels install fast EV chargers?</h3>
            <p className="leading-relaxed text-gray-400">Yes. Highway properties can be suitable for high-output EV charging because long-distance EV travellers often need faster charging during their journey.</p>
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">Does EVSTAY provide EV charger installation?</h3>
            <p className="leading-relaxed text-gray-400">EVSTAY's website states that its professional setup includes site survey, electrical work, installation and commissioning.</p>
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">Does EVSTAY provide EV charging software?</h3>
            <p className="leading-relaxed text-gray-400">Yes. EVSTAY provides OCPP-compliant cloud management software as part of its EV charging ecosystem.</p>
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">How can customers pay for EV charging?</h3>
            <p className="leading-relaxed text-gray-400">According to EVSTAY, supported payment options include credit/debit cards, mobile wallets and RFID access tags through its mobile web experience or app.</p>
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">Can EV charging generate revenue for hotels?</h3>
            <p className="leading-relaxed text-gray-400">Yes. Commercial EV charging can be monetized through charging sessions and flexible pricing models. The exact commercial arrangement depends on the property and partnership model.</p>
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">Who handles EV charging support?</h3>
            <p className="leading-relaxed text-gray-400">EVSTAY provides 24/7 monitoring and support and states that maintenance and guest troubleshooting are handled by its experts.</p>
            <h3 className="text-base font-normal text-primary-400 mt-6 mb-3">How much does hotel EV charger installation cost?</h3>
            <p className="leading-relaxed text-gray-400">Installation cost depends on factors such as property infrastructure, available power, number of chargers and site requirements. EVSTAY recommends a tailored site assessment for an accurate quotation.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">The EV-Ready Hospitality Property</h2>
            <p className="leading-relaxed text-gray-400">The future of hospitality will increasingly be shaped by changing traveller expectations.</p>
            <p className="leading-relaxed text-gray-400">Guests want convenience.</p>
            <p className="leading-relaxed text-gray-400">Travellers want reliable infrastructure.</p>
            <p className="leading-relaxed text-gray-400">Businesses want new revenue opportunities.</p>
            <p className="leading-relaxed text-gray-400">Properties want sustainable solutions.</p>
            <p className="leading-relaxed text-gray-400">EV charging sits at the intersection of all four.</p>
            <p className="leading-relaxed text-gray-400">A hotel with an EV charging station can offer more than accommodation.</p>
            <p className="leading-relaxed text-gray-400">A resort with destination charging can offer a complete EV-friendly travel experience.</p>
            <p className="leading-relaxed text-gray-400">A restaurant with EV charging can turn charging time into dining time.</p>
            <p className="leading-relaxed text-gray-400">A highway property with fast charging can become part of the electric road-trip infrastructure.</p>
            <p className="leading-relaxed text-gray-400">And an integrated platform like EVSTAY can connect the hardware, software, payments, monitoring and operational support required to make that ecosystem work.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">EVSTAY: Building the Future of Hospitality EV Charging</h2>
            <p className="leading-relaxed text-gray-400">EVSTAY is focused on creating <strong className="text-gray-300 font-medium">premium <a href="/" className="text-primary-400 hover:underline">EV charging infrastructure</a> for the hospitality industry</strong>.</p>
            <p className="leading-relaxed text-gray-400">Its solution is designed for hotels, resorts, restaurants, lodges and highway properties.</p>
            <p className="leading-relaxed text-gray-400">From <strong className="text-gray-300 font-medium">22 kW destination charging</strong> for long-stay hospitality to <strong className="text-gray-300 font-medium">60 kW charging</strong> for restaurants and cafés and <strong className="text-gray-300 font-medium">up to 150 kW high-output charging</strong> for highway transit properties, EVSTAY offers different charging models for different use cases.</p>
            <p className="leading-relaxed text-gray-400">The platform combines:</p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">EV Charging Hardware</strong></p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">Professional Installation</strong></p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">Cloud-Based EV Charging Management</strong></p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">OCPP-Compliant Technology</strong></p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">Digital Payments</strong></p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">Billing Management</strong></p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">24/7 Monitoring</strong></p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">Guest Support</strong></p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">Revenue Generation</strong></p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">Hospitality-Focused Charging Infrastructure</strong></p>
            <p className="leading-relaxed text-gray-400">The result is an integrated approach to <strong className="text-gray-300 font-medium">EV charging for hotels, resorts and hospitality businesses</strong>.</p>
            <p className="leading-relaxed text-gray-400">As electric mobility continues to grow, properties that invest in EV charging today can position themselves for the changing needs of tomorrow's travellers.</p>
            <p className="leading-relaxed text-gray-400">EV charging is no longer only about charging a vehicle.</p>
            <p className="leading-relaxed text-gray-400">It is about creating a better journey.</p>
            <p className="leading-relaxed text-gray-400">It is about improving the guest experience.</p>
            <p className="leading-relaxed text-gray-400">It is about building sustainable hospitality.</p>
            <p className="leading-relaxed text-gray-400">It is about creating new business opportunities.</p>
            <p className="leading-relaxed text-gray-400">And it is about making every stay a charging opportunity.</p>
            <hr className="border-gray-800/80 my-6" />
            <h2 className="text-lg md:text-xl font-normal text-white mt-8 mb-4">Ready to Make Your Property EV-Ready?</h2>
            <p className="leading-relaxed text-gray-400">Hotels, resorts, restaurants, cafés, lodges and highway properties can explore EVSTAY's charging partnership models and identify the right <a href="/" className="text-primary-400 hover:underline">EV charging infrastructure</a> for their location.</p>
            <p className="leading-relaxed text-gray-400">Whether the requirement is <strong className="text-gray-300 font-medium">hotel EV charging</strong>, <strong className="text-gray-300 font-medium">resort EV charging</strong>, <strong className="text-gray-300 font-medium">restaurant EV charging</strong>, <strong className="text-gray-300 font-medium">destination charging</strong>, <strong className="text-gray-300 font-medium">fast EV charging</strong> or a <strong className="text-gray-300 font-medium">complete commercial EV charging solution</strong>, the right charging model depends on the property's location, electrical infrastructure, parking capacity and customer requirements.</p>
            <p className="leading-relaxed text-gray-400">Explore EVSTAY and discover how your property can become part of the growing electric mobility ecosystem.</p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">EVSTAY — Premium EV Infrastructure for Hospitality.</strong></p>
            <p className="leading-relaxed text-gray-400"><strong className="text-gray-300 font-medium">Turn Every Stay Into a Charging Opportunity.</strong></p>
          </div>
        </details>

        {/* Bottom Bar Separator & Legal Copyright */}
        <div className="pt-8 border-t border-gray-800/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 EV Stay. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="/sitemap" className="hover:text-primary-400 transition-colors">
              Sitemap
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;