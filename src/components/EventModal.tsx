import { useState } from "react";
import { X, Calendar, MapPin, Clock } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    date: string;
    time: string;
    location: string;
    image: string;
    description: string;
    progress: number;
    donors: number;
    goal: number;
  } | null;
}

export const EventModal = ({ isOpen, onClose, event }: EventModalProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"yape" | "plin" | "card" | null>(null);

  const amounts = [10, 25, 50, 100];

  const handleDonate = () => {
    const amount = selectedAmount === 0 ? parseFloat(customAmount) : selectedAmount;
    if (!amount || amount <= 0) {
      toast.error("Por favor selecciona un monto válido");
      return;
    }
    setShowPayment(true);
  };

  const handleConfirmPayment = () => {
    toast.success("🎉 ¡Gracias por tu aporte! Tu donación está ayudando a impulsar la cultura peruana.");
    setTimeout(() => {
      onClose();
      setShowPayment(false);
      setSelectedAmount(null);
      setCustomAmount("");
      setPaymentMethod(null);
    }, 2000);
  };

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-background/80 p-2 hover:bg-background transition-smooth"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              {event.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          </div>

          <p className="text-muted-foreground mb-6">{event.description}</p>

          <div className="bg-secondary p-6 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-semibold">Progreso de recaudación</span>
              <span className="text-2xl font-bold text-primary">{event.progress}%</span>
            </div>
            <div className="w-full bg-background rounded-full h-3 overflow-hidden mb-3">
              <div
                className="bg-primary h-full transition-all duration-500"
                style={{ width: `${event.progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{event.donors} donadores</span>
              <span>Meta: S/. {event.goal}</span>
            </div>
          </div>

          {!showPayment ? (
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Apoya Este Evento</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {amounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                  >
                    S/. {amount}
                  </Button>
                ))}
              </div>

              <div className="mb-4">
                <Button
                  variant={selectedAmount === 0 ? "default" : "outline"}
                  className="w-full mb-3"
                  onClick={() => {
                    setSelectedAmount(0);
                  }}
                >
                  Otro monto
                </Button>
                {selectedAmount === 0 && (
                  <Input
                    type="number"
                    placeholder="Ingresa el monto"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full"
                  />
                )}
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleDonate}
                disabled={!selectedAmount && !customAmount}
              >
                Continuar con la donación
              </Button>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Método de Pago</h3>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <Button
                  variant={paymentMethod === "yape" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("yape")}
                  className="h-20"
                >
                  Yape
                </Button>
                <Button
                  variant={paymentMethod === "plin" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("plin")}
                  className="h-20"
                >
                  Plin
                </Button>
                <Button
                  variant={paymentMethod === "card" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("card")}
                  className="h-20"
                >
                  Tarjeta
                </Button>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4 mb-6">
                  <Input placeholder="Número de tarjeta" />
                  <Input placeholder="Nombre en la tarjeta" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="MM/AA" />
                    <Input placeholder="CVV" />
                  </div>
                </div>
              )}

              {(paymentMethod === "yape" || paymentMethod === "plin") && (
                <div className="flex flex-col items-center justify-center py-6 mb-6 bg-secondary rounded-lg">
                  <div className="w-48 h-48 bg-background rounded-lg flex items-center justify-center mb-4">
                    <p className="text-muted-foreground text-center p-4">
                      QR Code simulado<br />
                      {paymentMethod === "yape" ? "Yape" : "Plin"}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Escanea el código QR con tu app
                  </p>
                </div>
              )}

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleConfirmPayment}
                disabled={!paymentMethod}
              >
                Confirmar Donación de S/. {selectedAmount === 0 ? customAmount : selectedAmount}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
