import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { devblogs } from './catalog/catalogData';
import { DevBlogCard } from './catalog/DevBlogCard';
import { DevBlogDetailsDialog } from './catalog/DevBlogDetailsDialog';
import { PurchaseDialog } from './catalog/PurchaseDialog';
import type { DevBlog } from './catalog/catalogData';

const Catalog = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingPeriods, setBillingPeriods] = useState<{ [key: string]: 'week' | 'month' }>({});
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedDevblog, setSelectedDevblog] = useState<DevBlog | null>(null);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

  const handleBillingChange = (devblogId: string, period: 'week' | 'month') => {
    setBillingPeriods(prev => ({ ...prev, [devblogId]: period }));
  };

  const getBillingPeriod = (devblogId: string) => billingPeriods[devblogId] || 'month';

  const openDetails = (devblog: DevBlog) => {
    setSelectedDevblog(devblog);
    setIsDetailsOpen(true);
  };

  const handleSelectPlan = () => {
    if (selectedDevblog) {
      setSelectedPlan(selectedDevblog.id);
      setIsDetailsOpen(false);
      setIsPurchaseOpen(true);
    }
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-4">
            <span className="text-neon-cyan">Каталог</span>
            <span className="text-neon-purple"> DevBlog'ов</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Все обновления и изменения Rust серверов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {devblogs.map((devblog, index) => (
            <DevBlogCard
              key={devblog.id}
              devblog={devblog}
              index={index}
              onOpenDetails={openDetails}
            />
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-foreground/60 mb-4">Нужна помощь с выбором?</p>
          <Button 
            onClick={() => window.location.href = '/support'}
            variant="outline" 
            className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
          >
            <Icon name="MessageCircle" size={18} className="mr-2" />
            Связаться с поддержкой
          </Button>
        </div>
      </div>

      <DevBlogDetailsDialog
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        devblog={selectedDevblog}
        billingPeriod={selectedDevblog ? getBillingPeriod(selectedDevblog.id) : 'month'}
        onBillingChange={handleBillingChange}
        onSelectPlan={handleSelectPlan}
      />

      <PurchaseDialog
        isOpen={isPurchaseOpen}
        onOpenChange={setIsPurchaseOpen}
        devblog={selectedDevblog}
        billingPeriod={selectedDevblog ? getBillingPeriod(selectedDevblog.id) : 'month'}
        selectedPaymentMethod={selectedPaymentMethod}
        onPaymentMethodChange={setSelectedPaymentMethod}
      />
    </div>
  );
};

export default Catalog;
