FROM python:3.10-slim

# Create a non-root user like Hugging Face recommends
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY --chown=user requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY --chown=user . /app

# Expose port
EXPOSE 7860

# Start Flask app
CMD ["python", "app.py"]
