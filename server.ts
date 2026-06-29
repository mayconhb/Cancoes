import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Generate Song (Treblo Integration)
  app.post("/api/generate-song", async (req, res) => {
    console.log("Recebendo requisição para gerar música:", req.body);
    const { recipient, style, recipientName, senderName, story, emotions, occasion } = req.body;
    
    const apiKey = process.env.TREBLO_API_KEY;
    const apiUrl = process.env.TREBLO_API_URL || "https://api.treblo.com.br/v1";

    if (!apiKey || apiKey === "your_treblo_api_key") {
      console.log("Treblo API Key não configurada, entrando em modo MOCK.");
      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log("Gerado mock com sucesso para:", recipientName);
      return res.json({
        id: "mock-123",
        title: `Música para ${recipientName}`,
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Demo audio
      });
    }

    try {
      // Prepared Treblo payload
      const response = await axios.post(`${apiUrl}/generate`, {
        prompt: `Crie uma música estilo ${style} para ${recipient} chamada ${recipientName}, de ${senderName}. História: ${story}. Emoções: ${emotions}. Ocasião: ${occasion}.`,
        style,
        recipient_name: recipientName,
        sender_name: senderName,
        story,
        emotions,
        occasion
      }, {
        headers: { "Authorization": `Bearer ${apiKey}` }
      });

      // Extract preview data based on actual API response structure
      res.json({
        id: response.data.id,
        title: response.data.title || `Música para ${recipientName}`,
        audioUrl: response.data.preview_url
      });
    } catch (error: any) {
      console.error("Treblo API error:", error.response?.data || error.message);
      res.status(500).json({ error: "Falha ao gerar a música. Tente novamente." });
    }
  });

  // API Route: Create Pix Payment (Mercado Pago Integration)
  app.post("/api/create-pix", async (req, res) => {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    
    if (!accessToken || accessToken === "your_mp_access_token") {
      console.log("Mercado Pago token not configured, using mock mode.");
      return res.json({
        id: "mock-payment-123",
        qrCode: "00020126580014BR.GOV.BCB.PIX0136mock-pix-code-123-456-789-0123456789",
        qrCodeBase64: "", // Frontend can generate from text if needed or use mock img
        amount: 47.90
      });
    }

    try {
      const response = await axios.post("https://api.mercadopago.com/v1/payments", {
        transaction_amount: 47.90, // Example price
        description: "Música Personalizada IA - Melodia IA",
        payment_method_id: "pix",
        payer: {
          email: "test_user_123@test.com", // In a real app, collect this from user
          first_name: "Cliente",
          last_name: "MelodiaIA",
          identification: {
            type: "CPF",
            number: "19119119100"
          }
        }
      }, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "X-Idempotency-Key": `${Date.now()}`
        }
      });

      const pointOfInteraction = response.data.point_of_interaction;
      res.json({
        id: response.data.id,
        qrCode: pointOfInteraction.transaction_data.qr_code,
        qrCodeBase64: pointOfInteraction.transaction_data.qr_code_base64,
        amount: response.data.transaction_amount
      });
    } catch (error: any) {
      console.error("Mercado Pago error:", error.response?.data || error.message);
      res.status(500).json({ error: "Erro ao gerar cobrança Pix." });
    }
  });

  // API Route: Check Payment Status
  app.get("/api/check-payment/:id", async (req, res) => {
    const { id } = req.params;
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (id.startsWith("mock-")) {
      // Mock payment check: auto-approve after 10 seconds of "pending"
      // In a real mock demo, we might want a "Simulate Payment" button instead
      return res.json({ status: "pending" });
    }

    try {
      const response = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: { "Authorization": `Bearer ${accessToken}` }
      });
      res.json({ status: response.data.status });
    } catch (error: any) {
      res.status(500).json({ error: "Erro ao verificar pagamento." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
