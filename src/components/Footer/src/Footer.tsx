import React from 'react';
import { Flame, MessageCircle, MapPin, Clock } from 'lucide-react';
import { RESTAURANT_NAME, WHATSAPP_NUMBER } from '../../../data/products';

const Footer: React.FC = () => {
    return (
        <footer
            data-testid="footer"
            className="border-t border-[#2e2e2e] bg-[#0d0d0d] px-4 py-12 sm:px-6"
        >
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
                    {/* Brand */}
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c8102e]" aria-hidden="true">
                                <Flame className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-bold text-white">{RESTAURANT_NAME}</span>
                        </div>
                        <p className="text-sm leading-relaxed text-[#999999]">
                            Tradición parrillera desde 1987. Leña de quebracho, cortes premium y el sabor del campo argentino.
                        </p>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col gap-3">
                        <h4 className="font-semibold text-white">Información</h4>
                        <div className="flex items-center gap-2 text-sm text-[#999999]">
                            <MapPin className="h-4 w-4 text-[#c8102e]" aria-hidden="true" />
                            Av. Corrientes 1234, CABA
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#999999]">
                            <Clock className="h-4 w-4 text-[#c8102e]" aria-hidden="true" />
                            Lun–Dom: 12:00 – 00:00
                        </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex flex-col gap-3">
                        <h4 className="font-semibold text-white">¿Dudas? Escribinos</h4>
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid="footer-whatsapp-link"
                            className="inline-flex items-center gap-2 rounded-xl bg-[#25D366]/10 px-4 py-2.5 text-sm font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/20"
                        >
                            <MessageCircle className="h-4 w-4" aria-hidden="true" />
                            Contactar por WhatsApp
                        </a>
                    </div>
                </div>

                <div className="mt-10 border-t border-[#2e2e2e] pt-6 text-center text-xs text-[#888888]">
                    © {new Date().getFullYear()} {RESTAURANT_NAME} · Todos los derechos reservados
                </div>
            </div>
        </footer>
    );
};

export default Footer;
