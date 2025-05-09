
import React, { useState } from "react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import { useTheme } from "@/providers/ThemeProvider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Sun, Moon, Palette, Upload } from "lucide-react";

const colorPresets = [
  { name: "Gold", value: "#D4AF37" },
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Red", value: "#E53E3E" },
  { name: "Blue", value: "#3182CE" },
  { name: "Green", value: "#38A169" },
];

const AdminThemeCustomizer = () => {
  const { isDarkMode, toggleTheme, primaryColor, setPrimaryColor, logoUrl, setLogoUrl } = useTheme();
  const [customColor, setCustomColor] = useState(primaryColor);
  const [customLogoUrl, setCustomLogoUrl] = useState(logoUrl);

  const handleColorUpdate = (color: string) => {
    setPrimaryColor(color);
    setCustomColor(color);
    toast.success("Primary color updated");
  };

  const handleLogoUpdate = () => {
    setLogoUrl(customLogoUrl);
    toast.success("Logo updated");
  };

  return (
    <AdminLayout
      title="Theme Customizer"
      subtitle="Customize your store's appearance"
    >
      <Tabs defaultValue="mode" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
          <TabsTrigger value="mode">
            {isDarkMode ? (
              <Moon size={16} className="mr-2" />
            ) : (
              <Sun size={16} className="mr-2" />
            )}
            Mode
          </TabsTrigger>
          <TabsTrigger value="colors">
            <Palette size={16} className="mr-2" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="logo">
            <Upload size={16} className="mr-2" />
            Logo
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="mode" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Light / Dark Mode</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Current mode: {isDarkMode ? "Dark" : "Light"}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Toggle between light and dark mode for your store
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Sun size={18} className={isDarkMode ? "text-muted-foreground" : "text-yellow-500"} />
                <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
                <Moon size={18} className={isDarkMode ? "text-blue-400" : "text-muted-foreground"} />
              </div>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className={`p-6 ${!isDarkMode ? "border-2 border-unshakn-gold" : ""}`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Light Mode</h4>
                {!isDarkMode && (
                  <span className="bg-unshakn-gold/20 text-unshakn-gold text-xs rounded-full px-2 py-1">
                    Active
                  </span>
                )}
              </div>
              <div className="h-32 rounded-md bg-white border flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-8 mx-auto mb-2 rounded bg-unshakn-gold"></div>
                  <p className="text-black text-sm">Sample Text</p>
                </div>
              </div>
              
              {isDarkMode && (
                <Button 
                  className="w-full mt-4"
                  onClick={toggleTheme}
                >
                  Switch to Light Mode
                </Button>
              )}
            </Card>
            
            <Card className={`p-6 ${isDarkMode ? "border-2 border-unshakn-gold" : ""}`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Dark Mode</h4>
                {isDarkMode && (
                  <span className="bg-unshakn-gold/20 text-unshakn-gold text-xs rounded-full px-2 py-1">
                    Active
                  </span>
                )}
              </div>
              <div className="h-32 rounded-md bg-black border flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-8 mx-auto mb-2 rounded bg-unshakn-gold"></div>
                  <p className="text-white text-sm">Sample Text</p>
                </div>
              </div>
              
              {!isDarkMode && (
                <Button 
                  className="w-full mt-4"
                  onClick={toggleTheme}
                >
                  Switch to Dark Mode
                </Button>
              )}
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="colors" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-6">Primary Color</h3>
            
            <div className="mb-6">
              <Label htmlFor="currentColor" className="mb-2 block">Current Color</Label>
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-md border"
                  style={{ backgroundColor: primaryColor }}
                ></div>
                <div>{primaryColor}</div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label className="mb-2 block">Color Presets</Label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {colorPresets.map((preset) => (
                    <motion.button
                      key={preset.value}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleColorUpdate(preset.value)}
                      className={`flex flex-col items-center gap-2 ${
                        primaryColor === preset.value ? "ring-2 ring-unshakn-gold ring-offset-2" : ""
                      }`}
                    >
                      <div 
                        className="w-10 h-10 rounded-full border"
                        style={{ backgroundColor: preset.value }}
                      ></div>
                      <span className="text-xs">{preset.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="customColor" className="mb-2 block">Custom Color</Label>
                <div className="flex gap-3 items-center">
                  <Input 
                    id="customColor"
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input 
                    type="text"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-32"
                  />
                  <Button 
                    onClick={() => handleColorUpdate(customColor)}
                    className="bg-unshakn-gold hover:bg-unshakn-dark-gold text-black"
                  >
                    Apply Color
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Preview</h3>
            <div className="rounded-md p-6 border">
              <div className={`rounded-md p-6 ${isDarkMode ? "bg-black" : "bg-white border"}`}>
                <div className="flex gap-4 mb-6">
                  <div 
                    className="rounded-md w-32 h-12 flex items-center justify-center text-black"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Button
                  </div>
                  <div 
                    className="rounded-md border w-32 h-12 flex items-center justify-center"
                    style={{ borderColor: primaryColor, color: primaryColor }}
                  >
                    Outline
                  </div>
                </div>
                
                <div 
                  className="h-2 rounded-full mb-4"
                  style={{ backgroundColor: primaryColor }}
                ></div>
                
                <div className="flex items-center gap-2 mb-4">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                  <span style={{ color: primaryColor }}>Text with primary color</span>
                </div>
                
                <p className={isDarkMode ? "text-white" : "text-black"}>
                  Regular text with <span style={{ color: primaryColor }}>highlighted</span> elements
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="logo" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-6">Logo Settings</h3>
            
            <div className="mb-6">
              <Label htmlFor="currentLogo" className="mb-2 block">Current Logo</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-md border flex items-center justify-center p-2 bg-muted/30">
                  {logoUrl ? (
                    <img 
                      src={logoUrl} 
                      alt="Current logo" 
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-muted-foreground text-xs">No logo</div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="logoUrl" className="mb-2 block">Logo URL</Label>
                <div className="flex gap-3 items-center">
                  <Input 
                    id="logoUrl"
                    type="text"
                    value={customLogoUrl}
                    onChange={(e) => setCustomLogoUrl(e.target.value)}
                    placeholder="Enter logo URL (PNG or SVG recommended)"
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleLogoUpdate}
                    className="bg-unshakn-gold hover:bg-unshakn-dark-gold text-black whitespace-nowrap"
                  >
                    Update Logo
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  For best results, use a transparent PNG or SVG file
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Logo Preview</h3>
            <div className={`rounded-md border p-4 ${isDarkMode ? "bg-black" : "bg-white"}`}>
              <div className="flex items-center justify-between border-b pb-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-background/50 rounded-md flex items-center justify-center overflow-hidden">
                    {logoUrl ? (
                      <img 
                        src={customLogoUrl} 
                        alt="Logo preview" 
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                        onLoad={(e) => {
                          (e.target as HTMLImageElement).style.display = "block";
                        }}
                      />
                    ) : (
                      <span className="font-bold text-xl" style={{ color: primaryColor }}>U</span>
                    )}
                  </div>
                  <span className="font-bold" style={{ color: primaryColor }}>UNSHAKN</span>
                </div>
                <div>
                  <div 
                    className="rounded-full px-3 py-1 text-xs"
                    style={{ backgroundColor: primaryColor, color: isDarkMode ? "black" : "white" }}
                  >
                    Shop Now
                  </div>
                </div>
              </div>
              
              <div className="h-20 flex items-center justify-center border rounded-md">
                <span className="text-sm text-muted-foreground">Header Navigation Preview</span>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminThemeCustomizer;
