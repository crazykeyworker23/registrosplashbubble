import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Lock, Eye, EyeOff, Check, Sparkles, Award, Gift, Phone, MapPin, FileText } from 'lucide-react';
import logoImage from '../assets/bubble.png';
import { registerUser } from '../api/api';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    city: 'IQUITOS',
    description: '',
    acceptTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ocultar splash después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    if (/[^a-zA-Z\d]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const getStrengthColor = (strength: number) => {
    if (strength <= 25) return 'bg-red-500';
    if (strength <= 50) return 'bg-orange-500';
    if (strength <= 75) return 'bg-[#FF6B6B]';
    return 'bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4]';
  };

  const getStrengthLabel = (strength: number) => {
    if (strength === 0) return '';
    if (strength <= 25) return 'Débil';
    if (strength <= 50) return 'Regular';
    if (strength <= 75) return 'Buena';
    return 'Excelente';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const registrationData = {
      use_txt_username: formData.email,
      use_txt_email: formData.email,
      use_txt_fullname: formData.fullName,
      password: formData.password,
      use_txt_googlesub: null,
      use_txt_avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName)}&background=FF6B6B&color=fff&size=200`,
      srv_int_id: 1,
      rol_int_id: 3,
      use_txt_status: 'ACTIVO',
      is_active: true,
    };

    try {
      await registerUser(registrationData);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert(error instanceof Error ? error.message : 'Error al registrar el usuario');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Array de burbujas para animación
  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    x: Math.random() * 100,
    size: 20 + Math.random() * 40
  }));

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Splash Screen - Pantalla completa */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* Fondo del splash */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1520] via-[#0d1821] to-[#050a12]" />
            
            {/* Efectos de fondo del splash */}
            <div className="absolute inset-0 opacity-25">
              <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-gradient-to-br from-[#FF6B6B] via-[#FF8E72] to-[#FF6B6B] rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '5s' }} />
              <div className="absolute bottom-20 left-20 w-[550px] h-[550px] bg-gradient-to-br from-[#4ECDC4] via-[#5DD9C1] to-[#4ECDC4] rounded-full blur-[130px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#2C4E68] to-[#4ECDC4] rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }} />
            </div>

            {/* Contenido del splash */}
            <div className="relative z-10">
              {/* Anillos pulsantes alrededor del logo */}
              <motion.div
                animate={{ 
                  scale: [1, 1.8, 1],
                  opacity: [0.2, 0, 0.2]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute inset-0 -m-32 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] blur-3xl"
              />
              
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.4
                }}
                className="absolute inset-0 -m-24 rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#FF6B6B] blur-2xl"
              />

              {/* Logo con animaciones */}
              <motion.div
                initial={{ scale: 0.3, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.3,
                  duration: 1,
                  type: 'spring',
                  stiffness: 150,
                  damping: 15
                }}
                className="relative"
              >
                <motion.img 
                  src={logoImage} 
                  alt="Splash Bubble" 
                  className="relative w-56 h-56 sm:w-64 sm:h-64 object-contain drop-shadow-2xl"
                  animate={{ 
                    y: [0, -15, 0],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1
                  }}
                />
              </motion.div>

              {/* Texto animado */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-center mt-12"
              >
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#5DD9C1] bg-clip-text text-transparent mb-3">
                  Splash Bubble
                </h1>
                <p className="text-[#4ECDC4]/70 text-base sm:text-lg">
                  Experiencia Premium
                </p>
                
                {/* Indicador de carga */}
                <motion.div 
                  className="mt-8 flex justify-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4]"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 1, 0.4]
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: 'easeInOut'
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido principal - Formulario */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.6, delay: showSplash ? 0 : 0.3 }}
        className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8"
      >
        {/* Fondo muy oscuro con tonos navy */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1520] via-[#0d1821] to-[#050a12]" />
        
        {/* Overlay de efectos coral y turquesa del logo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-[600px] h-[600px] bg-gradient-to-br from-[#FF6B6B] via-[#FF8E72] to-[#FF6B6B] rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '5s' }} />
          <div className="absolute bottom-20 left-10 w-[550px] h-[550px] bg-gradient-to-br from-[#4ECDC4] via-[#5DD9C1] to-[#4ECDC4] rounded-full blur-[130px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-[#2C4E68] to-[#4ECDC4] rounded-full blur-[110px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }} />
        </div>

        {/* Spotlight superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-radial from-[#4ECDC4]/10 via-[#FF6B6B]/5 to-transparent blur-3xl" />

        {/* Grid pattern sutil */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(78,205,196,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(78,205,196,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        {/* Burbujas de celebración */}
        <AnimatePresence>
          {isSuccess && bubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              initial={{ y: '100vh', x: `${bubble.x}vw`, opacity: 0, scale: 0 }}
              animate={{ 
                y: '-20vh', 
                x: `${bubble.x + (Math.random() - 0.5) * 20}vw`,
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0.8]
              }}
              transition={{ 
                duration: 3 + Math.random() * 2, 
                delay: bubble.delay,
                ease: 'easeOut'
              }}
              className="absolute pointer-events-none"
              style={{
                width: bubble.size,
                height: bubble.size,
              }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FF6B6B]/40 to-[#4ECDC4]/40 backdrop-blur-sm border border-[#4ECDC4]/30" />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Contenedor principal glassmorphism */}
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl z-10"
            >
              {/* Glow exterior coral-turquesa */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#2C4E68] rounded-3xl blur-2xl opacity-25" />
              
              {/* Reflejo superior cristal */}
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#4ECDC4]/10 to-transparent rounded-t-3xl" />
              
              <div className="relative backdrop-blur-3xl bg-[#0d1821]/60 border border-[#4ECDC4]/20 rounded-3xl p-10 sm:p-12 shadow-[0_25px_80px_0_rgba(0,0,0,0.8)]">
                {/* Logo real */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex justify-center mb-10"
                >
                  <div className="relative">
                    {/* Glow effect del logo */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-3xl blur-2xl opacity-50" />
                    
                    <img 
                      src={logoImage} 
                      alt="Splash Bubble" 
                      className="relative w-32 h-32 object-contain drop-shadow-2xl"
                    />
                  </div>
                </motion.div>

                {/* Encabezado */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#5DD9C1] bg-clip-text text-transparent mb-3 tracking-tight leading-tight">
                    Registro
                  </h1>
                  <p className="text-[#4ECDC4]/80 text-sm sm:text-base">
                    Crea tu cuenta y disfruta beneficios exclusivos
                  </p>
                </motion.div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Nombre completo */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <div className="relative">
                      <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                        focusedField === 'fullName' ? 'text-[#FF6B6B]' : 'text-[#4ECDC4]/40'
                      }`} />
                      <input
                        type="text"
                        placeholder="Nombre completo"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        onFocus={() => setFocusedField('fullName')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-12 pr-4 py-4 bg-[#0a1520]/50 border border-[#4ECDC4]/20 rounded-xl text-white placeholder:text-[#4ECDC4]/40 focus:border-[#FF6B6B] focus:bg-[#0a1520]/80 focus:shadow-lg focus:shadow-[#FF6B6B]/20 transition-all duration-300 outline-none"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </motion.div>

                  {/* Email y Teléfono en dos columnas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <div className="relative">
                        <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                          focusedField === 'email' ? 'text-[#4ECDC4]' : 'text-[#4ECDC4]/40'
                        }`} />
                        <input
                          type="email"
                          placeholder="Correo electrónico"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full pl-12 pr-4 py-4 bg-[#0a1520]/50 border border-[#4ECDC4]/20 rounded-xl text-white placeholder:text-[#4ECDC4]/40 focus:border-[#4ECDC4] focus:bg-[#0a1520]/80 focus:shadow-lg focus:shadow-[#4ECDC4]/20 transition-all duration-300 outline-none"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </motion.div>

                    {/* Teléfono */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55, duration: 0.6 }}
                    >
                      <div className="relative">
                        <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                          focusedField === 'phone' ? 'text-[#FF6B6B]' : 'text-[#4ECDC4]/40'
                        }`} />
                        <input
                          type="tel"
                          placeholder="Teléfono"
                          value={formData.phone}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 9);
                            setFormData({ ...formData, phone: value });
                          }}
                          maxLength={9}
                          inputMode="numeric"
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full pl-12 pr-4 py-4 bg-[#0a1520]/50 border border-[#4ECDC4]/20 rounded-xl text-white placeholder:text-[#4ECDC4]/40 focus:border-[#FF6B6B] focus:bg-[#0a1520]/80 focus:shadow-lg focus:shadow-[#FF6B6B]/20 transition-all duration-300 outline-none"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Ciudad */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <div className="relative">
                      <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                        focusedField === 'city' ? 'text-[#FF6B6B]' : 'text-[#4ECDC4]/40'
                      }`} />
                      <input
                        type="text"
                        placeholder="Ciudad"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        onFocus={() => setFocusedField('city')}
                        onBlur={() => setFocusedField(null)}
                        readOnly
                        className="w-full pl-12 pr-4 py-4 bg-[#0a1520]/50 border border-[#4ECDC4]/20 rounded-xl text-white placeholder:text-[#4ECDC4]/40 focus:border-[#FF6B6B] focus:bg-[#0a1520]/80 focus:shadow-lg focus:shadow-[#FF6B6B]/20 transition-all duration-300 outline-none"
                        disabled={isSubmitting}
                      />
                    </div>
                  </motion.div>

                  {/* Descripción opcional como select */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.62, duration: 0.6 }}
                  >
                    <div className="relative">
                      <FileText className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                        focusedField === 'description' ? 'text-[#4ECDC4]' : 'text-[#4ECDC4]/40'
                      }`} />
                      <select
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        onFocus={() => setFocusedField('description')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-12 pr-4 py-4 bg-[#0a1520]/50 border border-[#4ECDC4]/20 rounded-xl text-white placeholder:text-[#4ECDC4]/40 focus:border-[#4ECDC4] focus:bg-[#0a1520]/80 focus:shadow-lg focus:shadow-[#4ECDC4]/20 transition-all duration-300 outline-none appearance-none"
                        disabled={isSubmitting}
                      >
                        <option value="">Elige tu GYM (opcional)</option>
                        <option value="CROSSFIT_LA_ROCA">JOLUMA CROSSFIT</option>
                        <option value="JUMPING">JUMPING</option>
                        <option value="JULLY">JULLY</option>
                        <option value="ENERGY">ENERGY</option>
                      </select>
                    </div>
                  </motion.div>

                  {/* Contraseña */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.65, duration: 0.6 }}
                  >
                    <div className="relative">
                      <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                        focusedField === 'password' ? 'text-[#4ECDC4]' : 'text-[#4ECDC4]/40'
                      }`} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-12 pr-12 py-4 bg-[#0a1520]/50 border border-[#4ECDC4]/20 rounded-xl text-white placeholder:text-[#4ECDC4]/40 focus:border-[#4ECDC4] focus:bg-[#0a1520]/80 focus:shadow-lg focus:shadow-[#4ECDC4]/20 transition-all duration-300 outline-none"
                        required
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4ECDC4]/40 hover:text-[#4ECDC4]/80 transition-colors"
                        disabled={isSubmitting}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    {/* Indicador de fortaleza */}
                    {formData.password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#4ECDC4]/50">Fortaleza de contraseña</span>
                          <span className={`font-medium ${
                            passwordStrength >= 75 ? 'text-[#4ECDC4]' : 'text-white/70'
                          }`}>
                            {getStrengthLabel(passwordStrength)}
                          </span>
                        </div>
                        <div className="h-2 bg-[#2C4E68]/30 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${passwordStrength}%` }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className={`h-full ${getStrengthColor(passwordStrength)} rounded-full`}
                          />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Confirmar contraseña */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    <div className="relative">
                      <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                        focusedField === 'confirmPassword' ? 'text-[#FF6B6B]' : 'text-[#4ECDC4]/40'
                      }`} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirmar contraseña"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        onFocus={() => setFocusedField('confirmPassword')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-12 pr-12 py-4 bg-[#0a1520]/50 border border-[#4ECDC4]/20 rounded-xl text-white placeholder:text-[#4ECDC4]/40 focus:border-[#FF6B6B] focus:bg-[#0a1520]/80 focus:shadow-lg focus:shadow-[#FF6B6B]/20 transition-all duration-300 outline-none"
                        required
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4ECDC4]/40 hover:text-[#4ECDC4]/80 transition-colors"
                        disabled={isSubmitting}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </motion.div>

                  {/* Checkbox términos */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="flex items-start gap-3 pt-2"
                  >
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, acceptTerms: !formData.acceptTerms })}
                      className={`flex-shrink-0 w-5 h-5 rounded border transition-all duration-300 flex items-center justify-center ${
                        formData.acceptTerms
                          ? 'bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] border-[#FF6B6B]'
                          : 'bg-[#0a1520]/50 border-[#4ECDC4]/30 hover:border-[#4ECDC4]/60'
                      }`}
                      disabled={isSubmitting}
                    >
                      {formData.acceptTerms && <Check className="w-3 h-3 text-white" />}
                    </button>
                    <label className="text-xs text-[#4ECDC4]/70 leading-relaxed">
                      Acepto los{' '}
                      <a href="#" className="text-[#FF6B6B] hover:text-[#FF8E72] transition-colors underline">
                        términos y condiciones
                      </a>{' '}
                      y la{' '}
                      <a href="#" className="text-[#4ECDC4] hover:text-[#5DD9C1] transition-colors underline">
                        política de privacidad
                      </a>
                    </label>
                  </motion.div>

                  {/* Botón de registro */}
                  <motion.button
                    type="submit"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    whileHover={!isSubmitting && formData.acceptTerms ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isSubmitting && formData.acceptTerms ? { scale: 0.98 } : {}}
                    disabled={!formData.acceptTerms || isSubmitting}
                    className="relative w-full py-5 bg-gradient-to-r from-[#FF6B6B] via-[#FF8E72] to-[#4ECDC4] text-white font-bold text-lg rounded-xl shadow-2xl shadow-[#FF6B6B]/40 hover:shadow-[#4ECDC4]/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-[#FF6B6B]/40 mt-8 overflow-hidden group"
                  >
                    {/* Shimmer effect */}
                    {!isSubmitting && formData.acceptTerms && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ['-200%', '200%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                      />
                    )}
                    
                    <span className="relative z-10">
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Creando cuenta...
                        </span>
                      ) : (
                        'Crear cuenta'
                      )}
                    </span>
                  </motion.button>
                </form>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="text-center mt-8"
                >
                </motion.div>

                {/* Detalle decorativo */}
                <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#4ECDC4]/50 to-transparent rounded-full" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl z-10"
            >
              {/* Glow exterior */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#FF6B6B] rounded-3xl blur-2xl opacity-30" />
              
              {/* Reflejo superior cristal */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#4ECDC4]/10 to-transparent rounded-t-3xl" />
              
              <div className="relative backdrop-blur-3xl bg-[#0d1821]/60 border border-[#4ECDC4]/20 rounded-3xl p-8 sm:p-10 shadow-[0_25px_80px_0_rgba(0,0,0,0.8)]">
                {/* Icono de éxito animado */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 0.2, 
                    type: 'spring', 
                    stiffness: 200, 
                    damping: 15 
                  }}
                  className="flex justify-center mb-8"
                >
                  <div className="relative">
                    {/* Anillo pulsante */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4]"
                    />
                    
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#FF6B6B] via-[#FF8E72] to-[#4ECDC4] flex items-center justify-center shadow-2xl shadow-[#4ECDC4]/50">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                      >
                        <Check className="w-12 h-12 text-white stroke-[3]" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Mensaje de éxito */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-center mb-8"
                >
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#5DD9C1] bg-clip-text text-transparent tracking-tight">
                    Registro exitoso
                  </h1>
                </motion.div>
                {/* Espacio entre título y beneficios */}
                <div className="h-6" />

                {/* Beneficios */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="space-y-4 mb-8"
                >
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="flex items-start gap-4 p-4 bg-[#0a1520]/50 rounded-xl border border-[#4ECDC4]/20"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B6B]/30 to-[#FF8E72]/20 flex items-center justify-center">
                      <Award className="w-5 h-5 text-[#FF6B6B]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">% de descuento</h3>
                      <p className="text-[#4ECDC4]/70 text-sm">Por tu registro obtuviste un % de descuento en tu bebida</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="flex items-start gap-4 p-4 bg-[#0a1520]/50 rounded-xl border border-[#4ECDC4]/20"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#4ECDC4]/30 to-[#5DD9C1]/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[#4ECDC4]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Ofertas personalizadas</h3>
                      <p className="text-[#4ECDC4]/70 text-sm">Recibe promociones diseñadas para ti</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="flex items-start gap-4 p-4 bg-[#0a1520]/50 rounded-xl border border-[#4ECDC4]/20"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B6B]/30 to-[#4ECDC4]/20 flex items-center justify-center">
                      <Gift className="w-5 h-5 text-[#FF8E72]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Visítanos</h3>
                      <p className="text-[#4ECDC4]/70 text-sm">Visítanos en Calle Sargento Lores #762</p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Botón de continuar */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      password: '',
                      confirmPassword: '',
                      city: 'IQUITOS',
                      description: '',
                      acceptTerms: false,
                    });
                  }}
                  className="w-full py-5 bg-gradient-to-r from-[#FF6B6B] via-[#FF8E72] to-[#4ECDC4] text-white font-bold text-lg rounded-xl shadow-2xl shadow-[#FF6B6B]/40 hover:shadow-[#4ECDC4]/60 transition-all duration-300"
                >
                  Listo
                </motion.button>

                {/* Detalle decorativo */}
                <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#4ECDC4]/50 to-transparent rounded-full" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
