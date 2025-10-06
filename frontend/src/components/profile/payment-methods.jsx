import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";


export function PaymentMethods() {
  const { profile, updateProfile } = useState();

  const [adding, setAdding] = useState(false);
  const [brand, setBrand] = useState("Visa");
  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");

  function setDefault(id) {
    const updated = profile.paymentMethods.map((pm) => ({
      ...pm,
      default: pm.id === id,
    }));
    updateProfile({ paymentMethods: updated });
    toast({ title: "Default payment method updated" });
  }

  function removeMethod(id) {
    const keep = profile.paymentMethods.filter((pm) => pm.id !== id);
    updateProfile({ paymentMethods: keep });
    toast({ title: "Payment method removed" });
  }

  async function addMethod(e) {
    e.preventDefault();
    if (!/^\d{12,19}$/.test(cardNumber.replace(/\s|-/g, ""))) {
      toast({ title: "Invalid card number", variant: "destructive" });
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(exp)) {
      toast({ title: "Invalid expiry format (MM/YY)", variant: "destructive" });
      return;
    }
    const last4 = cardNumber.slice(-4);
    const newPm = {
      id: `pm_${Date.now()}`,
      brand,
      last4,
      exp,
      default: profile.paymentMethods.length === 0,
    };
    await new Promise((r) => setTimeout(r, 500));
    updateProfile({ paymentMethods: [...profile.paymentMethods, newPm] });
    setAdding(false);
    setBrand("Visa");
    setCardNumber("");
    setExp("");
    toast({ title: "Payment method added" });
  }

  return (
    <div className="space-y-4">
      <ul className="flex flex-col gap-3">
        {profile.paymentMethods.map((pm) => (
          <li
            key={pm.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-md border p-3"
            aria-label={`${pm.brand} ending in ${pm.last4}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{pm.brand}</span>
              <span className="text-sm text-muted-foreground">
                •••• {pm.last4}
              </span>
              <span className="text-xs text-muted-foreground">
                Exp {pm.exp}
              </span>
              {pm.default && <Badge variant="outline">Default</Badge>}
            </div>
            <div className="flex items-center gap-2">
              {!pm.default && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDefault(pm.id)}
                >
                  Set default
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeMethod(pm.id)}
                aria-label={`Remove ${pm.brand} ending in ${pm.last4}`}
              >
                Remove
              </Button>
            </div>
          </li>
        ))}

        {profile.paymentMethods.length === 0 && (
          <li className="rounded-md border p-4 text-sm text-muted-foreground">
            No payment methods yet. Add one below.
          </li>
        )}
      </ul>

      <Separator />

      {!adding ? (
        <div className="flex justify-end">
          <Button onClick={() => setAdding(true)} aria-expanded={adding}>
            Add payment method
          </Button>
        </div>
      ) : (
        <form onSubmit={addMethod} className="grid grid-cols-1 gap-3">
          <div className="grid gap-2">
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Visa"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="card">Card number</Label>
            <Input
              id="card"
              inputMode="numeric"
              value={cardNumber}
              onChange={(e) =>
                setCardNumber(e.target.value.replace(/[^\d]/g, ""))
              }
              placeholder="4242424242424242"
              aria-describedby="card-help"
            />
            <span id="card-help" className="text-xs text-muted-foreground">
              Enter digits only; formatting is automatic later.
            </span>
          </div>
          <div className="grid gap-2 md:max-w-40">
            <Label htmlFor="exp">Expiry (MM/YY)</Label>
            <Input
              id="exp"
              placeholder="08/27"
              value={exp}
              onChange={(e) => setExp(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setAdding(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save method</Button>
          </div>
        </form>
      )}
    </div>
  );
}
