import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FacebookIcon from "@mui/icons-material/Facebook";
import { fetchCreativesPaginated, Creative } from "../api/creatives";
import CreativeCard from "../components/CreativeCard";
import FilterBar from "../components/FilterBar";

const LIMIT = 10;

const CreativesDashboard: React.FC = () => {
  const [creatives, setCreatives] = useState<Creative[]>([]);
  const [cursor, setCursor] = useState<number | undefined>(undefined); // cursor for pagination
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const initialLoadDone = useRef(false);

  const loadMoreCreatives = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await fetchCreativesPaginated(LIMIT, cursor);
      setCreatives((prev) => [...prev, ...data.creative_details]);
      setCursor(data.next_cursor);
      setHasMore(data.has_more);
    } catch (error) {
      console.error("Error loading creatives:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, cursor]);

  // Initial load on mount (only once)
  useEffect(() => {
    if (!initialLoadDone.current) {
      loadMoreCreatives();
      initialLoadDone.current = true;
    }
  }, [loadMoreCreatives]);

  const availableLabels = Array.from(
    new Set(
      creatives.flatMap((creative) => {
        let labels: string[] = [];
        if (creative.labels) {
          try {
            labels = JSON.parse(creative.labels);
          } catch (error) {
            console.error("Error parsing labels:", error);
          }
        }
        return labels;
      })
    )
  );

  const filteredCreatives = creatives.filter((creative) => {
    if (selectedLabels.length === 0) return true;
    let labels: string[] = [];
    if (creative.labels) {
      try {
        labels = JSON.parse(creative.labels);
      } catch (error) {
        console.error("Error parsing labels:", error);
      }
    }
    return selectedLabels.some((filter) => labels.includes(filter));
  });

  return (
    <Container className="w-full h-full flex flex-col shadow-2xl" maxWidth="lg">
      <AppBar position="static" color="warning">
        <Toolbar className="flex justify-between">
          <div className="flex items-center space-x-2">
            <IconButton edge="start" color="inherit">
              <FacebookIcon />
            </IconButton>
            <Typography variant="h6" className="font-bold">
              Creatives API
            </Typography>
          </div>
          <div className="flex items-center space-x-2">
            <Button color="inherit">Creatives</Button>
            <IconButton edge="end" color="inherit">
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <div className="flex-grow p-4 md:p-8">
        {availableLabels.length > 0 && (
          <FilterBar
            availableLabels={availableLabels}
            selectedLabels={selectedLabels}
            onChange={setSelectedLabels}
          />
        )}
      </div>
      <div className="flex-grow p-4 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCreatives.map((creative) => (
            <CreativeCard key={creative.creative_id} creative={creative} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-4 text-center">
            <Button
              variant="outlined"
              onClick={loadMoreCreatives}
              disabled={loading}
            >
              {loading ? "Loading more..." : "Load More"}
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default CreativesDashboard;
